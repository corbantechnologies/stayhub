"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";

function HostNavbar() {
  const params = useParams()
  return (
    <nav className="flex justify-between gap-5 items-center py-5">
      <h1 className="text-2xl font-bold">StayHub</h1>
      <ul className='flex gap-5'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/'>Reservations</Link>
        </li>
        <li>
          <Link href='/'>Listings</Link>
        </li>
      </ul>
      <div className="flex items-center gap-3">
      <Button className='cursor-pointer'>
      <Link href={`/host/${params.hostId}/homes/new`}>Create listing</Link>
      </Button>
      <Button
        onClick={() =>
          signOut({ callbackUrl: process.env.NEXTAUTH_URL, redirect: true })
        }
        variant="ghost"
        className="flex gap-1 items-center cursor-pointer"
      >
        <LogOut size={18} />
      </Button>
      </div>
    </nav>
  );
}

export default HostNavbar;
