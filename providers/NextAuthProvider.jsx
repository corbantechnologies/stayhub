"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

function NextAuthProvider({ children }) {
  return (
    <SessionProvider>
      {children}
      <Toaster position="top-right" />
    </SessionProvider>
  );
}

export default NextAuthProvider;
