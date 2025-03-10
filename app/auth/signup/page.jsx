"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { userRegistration } from "@/services/accounts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field is required." })
    .email("This is not a valid email."),
  password: z.string().min(4, { message: "This field is required." }),
  first_name: z.string(),
  last_name: z.string(),
  // phone: z.string(),
});

function Signup() {
  const [seePassword, setSeePassword] = useState(false);
  const [accountType, setAccountType] = useState('guest');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        first_name:'',
        last_name:'',
        // phone:'',
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try{
      setLoading(true);
      const result = await userRegistration(accountType, values)
      if (result.success) {
        toast.success('User created successfully', { id: "createsuccess" });
        router.push(`/auth/account-verification?verify_code=${encodeURIComponent(values.email)}`)
      }else {
        throw new Error('User not created');
      }
    }catch (error) {
      setLoading(false);
      toast.error("An error occured while signing up. Please try again!");
      console.log(error)
    }
  }
  return (
    <div className="flex md:h-screen">
      <div className="flex-1 overflow-auto p-4 flex flex-col">
        <h1 className="text-2xl  font-bold">StayHub</h1>
        <div className="flex-grow grid place-content-center mt-8">
          <p className="font-bold text-2xl text-center">Get Started Now</p>
          <p className="text-sm text-center text-[#5e5e5e] ">
            Create an account to access our awesome services
          </p>
          <div className="bg-slate-100 w-fit mt-5 mx-auto rounded-full p-1 flex gap-2">
            <button onClick={()=>setAccountType('guest')} className={`rounded-full py-1 px-4 ${accountType ==='guest' ? 'bg-black text-white':'' }`}>I&apos;m a Guest</button>
            <button onClick={()=>setAccountType('host')} className={`rounded-full py-1 px-4 ${accountType ==='host' ? 'bg-black text-white':'' }`}>I&apos;m a Host</button>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mt-10 md:w-[400px] space-y-8"
            >
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-full"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-full"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="rounded-full"
                        placeholder="stayhub@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                      type='number'
                        className="rounded-full"
                        placeholder="stayhub@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="w-full relative flex items-center">
                        <Input
                          className="w-full rounded-full"
                          type={`${seePassword ? "text" : "password"}`}
                          placeholder="******"
                          {...field}
                        />
                        <button
                          type="button"
                          className="cursor-pointer absolute right-2"
                          onClick={() => setSeePassword((prev) => !prev)}
                        >
                          {seePassword ? <Eye /> : <EyeOff />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms1" />
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
                <Link href="#" className="text-[#5e5e5e] text-sm">
                  Forgot password?
                </Link>
              </div>
              <Button disabled={loading} type="submit" className="w-full rounded-full">
                {loading ? <Loader2 className="animate-spin" /> : 'Sign Up' }
              </Button>
            </form>
          </Form>
          <p className="text-sm text-center my-5">
            Already have an account?
            <Link href="/auth/login" className="underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:flex-1 md:inline-flex">
        <Image
          src="/authBg.jpg"
          alt="house"
          width={1200}
          height={1900}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Signup;
