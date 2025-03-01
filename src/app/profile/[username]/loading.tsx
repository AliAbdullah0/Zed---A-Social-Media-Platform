"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function Loading() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Profile Card */}
        <Card className="w-full max-w-2xl mx-auto border-none shadow-lg">
          <CardHeader className="flex flex-col items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-3 w-full text-center">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Bio */}
            <Skeleton className="h-4 w-3/4 mx-auto" />
            {/* Links and Additional Info */}
            <div className="flex justify-center gap-4">
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
            {/* Stats */}
            <div className="flex justify-center gap-6">
              <Skeleton className="h-10 w-20 rounded-md" />
              <Skeleton className="h-10 w-20 rounded-md" />
              <Skeleton className="h-10 w-20 rounded-md" />
            </div>
          </CardContent>
        </Card>

        {/* Posts Section */}
        <div className="w-[80%] mx-auto space-y-6">
          {/* Posts Heading */}
          <Skeleton className="h-8 w-40" />

          {/* Post Previews */}
          {[1, 2, 3].map((_, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-32 w-full rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loading;