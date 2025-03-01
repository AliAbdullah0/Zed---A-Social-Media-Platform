"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-2xl text-red-500">
            Something Went Wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {error?.message || "An unexpected error has occurred."}
          </p>

          {error?.stack && process.env.NODE_ENV === "development" && (
            <pre className="text-sm text-muted-foreground bg-muted p-4 rounded-md overflow-auto max-h-64">
              {error.stack}
            </pre>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => reset()}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Try Again
            </Button>
            <Button
              onClick={() => router.push("/")}
              className="w-full sm:w-auto"
            >
              Go to Homepage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Error;