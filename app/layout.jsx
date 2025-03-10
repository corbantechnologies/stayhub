import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/providers/NextAuthProvider";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StayHub",
  description: "Your home away from home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <TanstackQueryProvider>
            {children}
          </TanstackQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
