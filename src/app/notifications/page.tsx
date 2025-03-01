"use client"

import { getNotifications, markNotificationsAsRead } from "@/actions/notification.action";
import { NotificationsSkeleton } from "@/components/NotificationSkeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HeartIcon, MessageCircleIcon, UserPlusIcon } from "lucide-react";

type Notifications = Awaited<ReturnType<typeof getNotifications>>
type Notification = Notifications[number]

function NotificationsPage() {
  const [notifications,setNotifications] = useState<Notification[]>([])
  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
    const fetchNotifications = async ()=>{
        setIsLoading(true)
        try {
          const data = await getNotifications()
          setNotifications(data)
          const unreads = data.filter(n => !n.read).map(n => n.id)
          if(unreads.length>0) await markNotificationsAsRead(unreads)
        } catch (error) {
          toast("Failed to fetch notifications!",{
            description:"Please check your internet connection.",
            duration:2000
          })
        }finally{
          setIsLoading(false)
        }
    }
    fetchNotifications()
  },[])
  if(isLoading) return <NotificationsSkeleton/>
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "LIKE":
        return <HeartIcon className="size-4 text-red-500" />;
      case "COMMENT":
        return <MessageCircleIcon className="size-4 text-blue-500" />;
      case "FOLLOW":
        return <UserPlusIcon className="size-4 text-green-500" />;
      default:
        return null;
    }
  };
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="border-b flex w-full justify-between ">
          <div>
            <CardTitle>Notifications</CardTitle>
          </div>
            <div className="text-sm text-muted-foreground mb-2">
              {notifications.filter((n) => !n.read).length} unread
            </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No notifications yet</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 border-b hover:bg-muted/25 transition-colors ${
                    !notification.read ? "bg-muted/50" : ""
                  }`}
                >
                  <Avatar className="mt-1">
                    <AvatarImage src={notification.creator.image ?? "/avatar.png"} />
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {getNotificationIcon(notification.type)}
                      <span>
                        <span className="font-medium">
                          {notification.creator.name ?? notification.creator.username}
                        </span>{" "}
                        {notification.type === "FOLLOW"
                          ? "started following you"
                          : notification.type === "LIKE"
                          ? "liked your post"
                          : "commented on your post"}
                      </span>
                    </div>

                    {notification.post &&
                      (notification.type === "LIKE" || notification.type === "Comment") && (
                        <div className="pl-6 space-y-2">
                          <div className="text-sm text-muted-foreground rounded-md p-2 bg-muted/30 mt-2">
                            <p>{notification.post.content}</p>
                            {notification.post.image && (
                              <img
                                src={notification.post.image}
                                alt="Post content"
                                className="mt-2 rounded-md w-full max-w-[200px] h-auto object-cover"
                              />
                            )}
                          </div>

                          {notification.type === "Comment" && notification.comment && (
                            <div className="text-sm p-2 bg-accent/50 rounded-md">
                              {notification.comment.content}
                            </div>
                          )}
                        </div>
                      )}

                    <p className="text-sm text-muted-foreground pl-6">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </ScrollArea >
        </CardContent>
      </Card>
    </div>
  );
}

export default NotificationsPage;
