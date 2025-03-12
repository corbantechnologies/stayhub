'use client';

import { CircleUser, Loader2, LogOut, Search, User } from "lucide-react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog"
  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "../ui/drawer"
import useWindowSize from "@/hooks/useWindowSize";
import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false)
    const {data:session} = useSession()
    const {width} = useWindowSize()
    const isDesktop = width >= 768;
  return (
    <nav className="flex justify-between gap-5 items-center py-5">
        <h1 className="text-2xl font-bold">StayHub</h1>
        <div className="relative flex items-center md:w-1/3">
        <Input placeholder='Search places' className='rounded-full placeholder:text-black' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
        <Search size={18} className="absolute right-2"/>
        </div>
        <div className="flex gap-5">
            {!session && <Link href='/auth/signup' className="hidden md:inline-flex bg-slate-50 rounded-full px-4 py-1">Airbnb your Home</Link>}
            <Popover>
            <PopoverTrigger className='cursor-pointer'><CircleUser size={32}/></PopoverTrigger>
            <PopoverContent className='mr-4 md:mr-8'>
                {session ?
                <div >
                  <Button asChild variant='ghost'>
                  <Link href={`${session?.user.is_host ? '/host' : '/guest'}/${session?.user?.id}`} className="flex items-center gap-1"> <User/> Profile</Link>
                  </Button>
                <Button onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL, redirect: true })} variant='ghost' className='mt-2 flex gap-1 items-center cursor-pointer'>
                 <LogOut size={18}/> Log out
                </Button> 
                </div>
                :
                <div className="flex flex-col gap-4">
                    {isDesktop ?
                    <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className='text-base font-normal'>Log in</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Log in</DialogTitle>
                        <DialogDescription>
                          Log in to access your account
                        </DialogDescription>
                      </DialogHeader>
                      <ProfileForm />
                    </DialogContent>
                  </Dialog>
                    :
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        <Button variant="outline">Log in</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className="text-left">
                        <DrawerTitle>Log in</DrawerTitle>
                        <DrawerDescription>
                            Log in to access your account
                        </DrawerDescription>
                        </DrawerHeader>
                        <ProfileForm className="px-4" />
                        <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                    </Drawer>
                }
                    <Link href='/auth/signup'>Sign up</Link>
                    <Link href='/auth/signup'>AirBnB your Home</Link>
                </div>}
            </PopoverContent>
            </Popover>
        </div>
    </nav>
  )
}

export default Navbar

function ProfileForm({ className }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        toast.error("Invalid credentials");
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Signin successful");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occured while signin in. Please try again!");
    }
  }
    return (
      <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="stayhub@example.com" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type='password' placeholder="********" onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <Button disabled={loading} type="submit">{loading ? <Loader2 className="animate-spin" /> : 'Log in'}</Button>
      </form>
    )
  }