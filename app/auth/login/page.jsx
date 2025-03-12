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
import Link from "next/link";
import { getSession, signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field is required." })
    .email("This is not a valid email."),
  password: z.string().min(4, { message: "This field is required." }),
});

function Login() {
  const [seePassword, setSeePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession()
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  if(session){
    router.push("/");
  }
  async function onSubmit(values) {
    const { email, password } = values;
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      const session = await getSession();
      if (res.error) {
        toast.error("Invalid credentials");
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Signin successful");
        if(session?.user?.is_host){
          router?.push(`/host/${session?.user.id}`);
        }else{
          router?.push("/");
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occured while signin in. Please try again!");
    }

  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 flex flex-col">
        <h1 className="text-2xl font-bold">StayHub</h1>
        <div className="flex-grow grid place-content-center">
          <p className="font-bold text-2xl text-center">Welcome back</p>
          <p className="text-sm text-center text-[#5e5e5e] ">Login to access your account</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mt-10 md:w-[400px] space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={loading}
                        className="rounded-full"
                        placeholder="stayhub@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          disabled={loading}
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
              <div className="flex justify-end">
                <Link href="/auth/forgot-password" className="text-[#5e5e5e] text-sm">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" disabled={loading} className="w-full rounded-full">
                {loading ? <Loader2 className="animate-spin" /> : 'Log in' }
              </Button>
            </form>
          </Form>
          <p className="text-sm text-center my-5">
            Don&apos;t have an account?
            <Link href="/auth/signup" className="underline">
              Sign Up
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

export default Login;
