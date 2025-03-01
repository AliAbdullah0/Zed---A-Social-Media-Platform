// components/Loading.tsx
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; 

const Loading: React.FC = () => {

  const loadingMessages: string[] = [
    "Initializing Zed...",
    "Connecting to the server...",
    "Loading your experience...",
    "Almost there...",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      
      <div className="relative mb-8">
        <h1 className="text-6xl font-bold tracking-tight animate-pulse text-primary">
          Zed
        </h1>
        <div className="absolute inset-0 -z-10 animate-spin-slow">
          <div className="w-24 h-24 border-4 border-dashed border-muted rounded-full" />
        </div>
      </div>

      
      <p className="text-lg text-muted-foreground animate-fade-in">
        {loadingMessages[currentMessageIndex]}
      </p>

  
      <div className="mt-4 w-48 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-loading-bar" />
      </div>
    </div>
  );
};

export default Loading;