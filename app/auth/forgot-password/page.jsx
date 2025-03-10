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
import { Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/services/accounts";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field is required." })
    .email("This is not a valid email."),
});

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values) {
    const { email } = values;
    setLoading(true);
    try {
      const result = await forgotPassword(email)
      if (result.success) {
        toast.success('Email sent successfully', { id: "createsuccess" });
        router.push(`/auth/reset-password`);
      } else {
        throw new Error('Email not sent');
      }
    } catch (error) {
      setLoading(false);
      console.error(error); 
      toast.error("An error occurred while sending email. Please try again!");
    } finally {
      setLoading(false); 
    }
  }
  
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 flex flex-col">
        <h1 className="text-2xl font-bold">StayHub</h1>
        <div className="flex-grow grid place-content-center">
          <p className="font-bold text-2xl text-center">Forgot password</p>
          <p className="text-sm text-center text-[#5e5e5e] ">
            Enter your email to get a password recovery code
          </p>
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
              <Button type="submit" disabled={loading} className="w-full rounded-full">
                {loading ? <Loader2 className="animate-spin" /> : 'Continue' }
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

export default ForgotPassword;
