"use client";
import { useSession } from "next-auth/react";

function useUserId() {
  const { data: session } = useSession();
  return session?.user?.id;
}

export default useUserId;
