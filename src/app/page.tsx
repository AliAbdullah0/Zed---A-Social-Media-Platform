import { getPosts } from "@/actions/post.action";
import { getDatabaseUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import SuggestedUsers from "@/components/SuggestedUsers";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
const user = await currentUser()
const posts = await getPosts();
const dbUserId = await getDatabaseUserId()
  return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-6">
            {user ? <CreatePost/>:null}
          <div className="space-y-6">
            {
              posts.map((post)=>(
                <PostCard key={post.id} post={post} dbUserId={dbUserId}/>
              ))
            }
          </div>
          </div>
          <div className="lg:block hidden lg:col-span-4 top-20 sticky">
            <SuggestedUsers/>
          </div>         
        </div>
      </>
  );
}
