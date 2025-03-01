"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

function MobileNavbar() {
  const { isSignedIn } = useAuth();
  const { user } = useUser(); // Correct way to get the current user
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <HomeIcon className="w-6 h-6" />
            <span className="sr-only">Home</span>
          </Link>
        </Button>

        {isSignedIn && user ? (
          <>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/notifications">
                <BellIcon className="w-6 h-6" />
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href={`/profile/${
                  user.username ?? user.primaryEmailAddress?.emailAddress.split("@")[0]
                }`}
              >
                <UserIcon className="w-6 h-6" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
            <SignOutButton>
              <Button variant="ghost" size="icon">
                <LogOutIcon className="w-6 h-6" />
                <span className="sr-only">Logout</span>
              </Button>
            </SignOutButton>
          </>
        ) : (
          <SignInButton mode="modal">
            <Button className="w-1/2" variant="default" size="sm">
              Sign In
            </Button>
          </SignInButton>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <SunIcon className="h-6 w-6 transition-all dark:hidden" />
          <MoonIcon className="h-6 w-6 hidden transition-all dark:block" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
}

export default MobileNavbar;
