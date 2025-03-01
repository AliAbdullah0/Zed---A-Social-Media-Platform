"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

// Extend ToasterProps with a custom variant prop
interface CustomToasterProps extends ToasterProps {
  variant?: "default" | "success" | "error" | "info" | "warning";
}

const Toaster = ({ variant = "default", ...props }: CustomToasterProps) => {
  const { theme = "system" } = useTheme();

  // Define variant-specific styles
  const variantStyles = {
    default:
      "group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border",
    success:
      "group-[.toaster]:bg-green-50 group-[.toaster]:text-green-800 group-[.toaster]:border-green-200",
    error:
      "group-[.toaster]:bg-red-50 group-[.toaster]:text-red-800 group-[.toaster]:border-red-200",
    info: "group-[.toaster]:bg-blue-50 group-[.toaster]:text-blue-800 group-[.toaster]:border-blue-200",
    warning:
      "group-[.toaster]:bg-yellow-50 group-[.toaster]:text-yellow-800 group-[.toaster]:border-yellow-200",
  };

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `group toast ${variantStyles[variant]} group-[.toaster]:shadow-lg`,
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };