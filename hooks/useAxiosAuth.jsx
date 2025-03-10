"use client";

import { useSession } from "next-auth/react";

function useAxiosAuth(contentType = "multipart/form-data") {
  const { data: session } = useSession();

  const tokens = session?.user?.token;

  const authenticationHeader = {
    headers: {
      Authorization: "Token " + tokens,
      "Content-Type": contentType,
    },
  };

  return authenticationHeader;
}

export default useAxiosAuth;
