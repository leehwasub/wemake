import { Form } from "react-router";
import type { Route } from "./+types/otp-complete-page";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "OTP Complete | wemake"},
  ]
}
  
export default function OtpCompletePage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Confirm OTP</h1>
          <p className="text-sm text-muted-foreground">Enter the 4-digit code we sent to your email</p>
        </div>
        <Form className="w-full space-y-4">
          <InputPair 
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            required
            type="email"
            placeholder="i.e wemake@gmail.com"
          />
          <InputPair 
            id="otp"
            label="OTP"
            description="Enter the 4-digit code we sent to your email"
            name="otp"
            required
            type="number"
            placeholder="i.e 1234"
          />
          <Button type="submit" className="w-full">Log in</Button>
        </Form>
      </div>
    </div>
    );
} 