"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function HostNavbar() {
  const params = useParams()
  const pathname = usePathname()
  const currentPath = pathname.split('/').pop()
  return (
    <nav>
      <nav className="flex justify-between gap-5 items-center py-5">
      <h1 className="text-2xl font-bold">StayHub</h1>
      <ul className='hidden md:flex gap-5'>
        <li>
          <Link className={`text-sm py-1 px-4 rounded-full ${currentPath === params.hostId ? 'text-white bg-black' :''}`} href={`/host/${params.hostId}/`}>Dashboard</Link>
        </li>
        <li>
          <Link className={`text-sm py-1 px-4 rounded-full ${currentPath === 'reservations' ? 'text-white bg-[#0f172b]':''}`} href={`/host/${params.hostId}/reservations`}>Reservations</Link>
        </li>
        <li>
          <Link className={`text-sm py-1 px-4 rounded-full ${currentPath === 'listing' ? 'text-white bg-black':''}`} href={`/host/${params.hostId}/my-listings`}>Listings</Link>
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
    <ul className='flex md:hidden gap-2'>
        <li>
          <Link className={`text-sm py-1 px-4 rounded-full ${currentPath === params.hostId ? 'text-white bg-black' :''}`} href={`/host/${params.hostId}/`}>Dashboard</Link>
        </li>
        <li>
          <Link className={`text-sm py-1 px-4 rounded-full ${currentPath === 'reservations' ? 'text-white bg-[#0f172b]':''}`} href={`/host/${params.hostId}/reservations`}>Reservations</Link>
        </li>
        <li>
          <Link className={`text-sm py-1 px-4 rounded-full ${currentPath === 'listing' ? 'text-white bg-black':''}`} href={`/host/${params.hostId}/my-listings`}>Listings</Link>
        </li>
      </ul>
    </nav>
  );
}

export default HostNavbar;
