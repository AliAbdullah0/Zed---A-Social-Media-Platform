"use client"
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Loader2Icon } from 'lucide-react';
import { toggleFollow } from '@/actions/user.action';

function FollowButton({userId}:{
    userId:string;
}) {
    const [isLoading,setIsLoading] = useState(false)
    const handleFollow = async ()=>{
        setIsLoading(true)
        try {
            await toggleFollow(userId);
        } catch (error) {
            
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <Button
    size={"sm"}
    variant={"secondary"}
    onClick={handleFollow}
    disabled={isLoading}
    className='w-20'
    >
      {
        isLoading ? (
            <Loader2Icon className='size-4 animate-spin'/>
        ): "Follow"
      }
    </Button>
  );
}

export default FollowButton;