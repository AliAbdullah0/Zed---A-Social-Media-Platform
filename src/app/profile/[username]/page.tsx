import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";
import { ReactElement } from "react";

type PageProps = { params: Promise<{ username: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { username } = await params;
  const user = await getProfileByUsername(username);
  if (!user) {
    return {
      title: "User Not Found",
      description: "The user you are looking for does not exist.",
    };
  }
  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

async function ProfilePageServer({ params }: PageProps): Promise<ReactElement> {
  const { username } = await params;
  const user = await getProfileByUsername(username);
  if (!user) {
    notFound();
    return null as never;
  }
  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);
  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}

export default ProfilePageServer;