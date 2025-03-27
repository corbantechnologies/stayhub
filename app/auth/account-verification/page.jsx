"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { verifyAccount } from "@/services/accounts";
 
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})
  
function OtpVerification() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          pin: "",
        },
      })
      const query = useSearchParams()
      const router = useRouter()
      const [loading, setLoading] = useState(false);
 
  const userEmail = query.get('verify_code')
      
  async function onSubmit(values) {
    try {
      setLoading(true);
      //verification not working
      const result = await verifyAccount(values.pin);
      
      if (result.success) {
        toast.success('Account verified successfully', { id: "createsuccess" });
        router.push(`/auth/login`);
      } else {
        throw new Error('Verification failed');
      }
    } catch (error) {
      setLoading(false);
      console.error(error); 
      toast.error("An error occurred while verifying. Please try again!");
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div className="p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold">StayHub</h1>
      <div className="flex-grow grid place-content-center">
          <h1 className="font-bold text-2xl lg:text-3xl text-center">OTP Verification</h1>
          <p className="my-3 text-center text-black/80">{`Please enter the OTP code sent to ${userEmail} for Verification`}</p>
          <hr className="my-5" />
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 flex flex-col mx-auto items-center">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <Button type="submit" disabled={loading} className="font-semibold px-10">{loading ? <Loader2 className="animate-spin"/> : 'Continue'}</Button>
        <button type="button" className="text-sm text-[#5e5e5e]">Didn&apos;t get any code? Check spam folder</button>
      </form>
    </Form>
        </div>
    </div>
  );
}

export default OtpVerification;
