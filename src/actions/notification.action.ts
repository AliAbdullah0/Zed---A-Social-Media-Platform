"use server"

import prisma from "@/lib/prisma";
import { getDatabaseUserId } from "./user.action"

export const getNotifications = async ()=>{
    const userId = await getDatabaseUserId()

    if(!userId) return[];
    try{
    const notifications = await prisma.notification.findMany({
        where:{
            userId
        },
        include:{
            creator:{
                select:{
                    id:true,
                    name:true,
                    username:true,
                    image:true,
                }
            },
            post:{
                select:{
                    id:true,
                    content:true,
                    image:true,
                }
            },
            comment:{
                select:{
                    content:true,
                    id:true,
                    createdAt:true,
                }
            }
        },
        orderBy:{
            createdAt:"desc"
        }
    })

    return notifications
}catch(error){
    console.log("Error getting notifications!");
    return [];
}
}


export const markNotificationsAsRead = async (notificationIds:string[])=>{
    try {
        await prisma.notification.updateMany({
            where:{
                id:{
                    in:notificationIds,
                }
            },
            data:{
                read:true
            }
        })

        return {success:true};
    } catch (error) {
        return {success:false,error:"Error Marking notifications!"}
    }
}