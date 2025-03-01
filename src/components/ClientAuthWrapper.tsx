// components/ClientAuthWrapper.tsx
"use client";

import { useAuth } from "@clerk/nextjs";
import Loading from "@/components/Loading";

const ClientAuthWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default ClientAuthWrapper;