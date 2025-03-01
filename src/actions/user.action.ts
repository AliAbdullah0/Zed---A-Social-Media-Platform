"use server"

import prisma from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export const syncUser = async ()=>{
    try {
        const {userId} = await auth()
        const user = await currentUser()

        const existingUser = await prisma.user.findUnique({
            where:{
                clerkId:userId ?? undefined,
            }
        })
        
        if(existingUser){
            return existingUser
        }

        if(!userId || !user){
            return;
        }

        const dbUser = await prisma.user.create({
            data:{
                clerkId:userId,
                name: `${user.firstName || ""} ${user.lastName || ""}`,
                username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                email: user.emailAddresses[0].emailAddress,
                image:user.imageUrl,
            }
        })

        return dbUser;

    } catch (error) {
        console.log('Error in Sync User!',error);
        
    }    
}

export const getUserByClerkId = async(clerkId:string)=>{
    return prisma.user.findUnique({
        where:{
            clerkId,
        },
        include:{
            _count:{
                select:{
                    followers:true,
                    following:true,
                    posts:true
                }
            }
        }
    })
}

export const getDatabaseUserId = async ()=>{
    const {userId:clerkId} = await auth()
    if(!clerkId){
        return null
    }

    const user = await getUserByClerkId(clerkId);

    if(!user){
        throw new Error("User not found!")
    }

    return user.id

}

export const getRandomUsers = async ()=>{
    try {
        const userId = await getDatabaseUserId()
        if(!userId) return []
        const randomUsers = await prisma.user.findMany({
            where:{
                AND:[
                    {
                        NOT:{
                            id:userId
                        }
                    },{
                        NOT:{
                        followers:{
                            some:{
                                followerId:userId
                            }
                        }
                    }}
                ]
            },
            select:{
                id:true,
                name:true,
                username:true,
                image:true,
                _count:{
                    select:{
                        followers:true,
                    },
                }
            },
            take:5
        })

        return randomUsers
    } catch (error) {
        console.log("Error Fetching Random Users!");
        return []
    }
}

export const toggleFollow = async (targetUserId:string)=>{
    try {
        const userId = await getDatabaseUserId()
        if(userId === targetUserId) throw new Error("You cannot follow Yourself!")
        if(!userId) return
        const existingFollow = await prisma.follows.findUnique({
            where:{
                followerId_followingId: {
                    followerId:userId,
                    followingId:targetUserId
                }
            }
        }) 

        if(existingFollow){
            await prisma.follows.delete({
                where:{
                    followerId_followingId:{
                        followerId:userId,
                        followingId:targetUserId,
                    }
                }
            })
        }else{
            await prisma.$transaction([
            prisma.follows.create({
                data:{
                    followerId:userId,
                    followingId:targetUserId
                }
            }),
             prisma.notification.create({
                data:{
                    type:"FOLLOW",
                    userId:targetUserId,
                    creatorId:userId
                }
            })
        ])
        }
        revalidatePath('/')
        return {sucess:true}

    } catch (error) {
        console.log("Error in Following!",error);
        return {success:false,error:"Error in following!"}
    }
}