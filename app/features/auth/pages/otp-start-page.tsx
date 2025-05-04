import { Form, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/otp-start-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircle } from "lucide-react";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "OTP Start | wemake"},
  ]
}

const formSchema = z.object({
  email: z.string().email(),
});

export const action = async ({request}: Route.ActionArgs) => {
  const formData = await request.formData();
  const {success, data} = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {error: "Invalid email address"};
  }
  const {email} = data;
  const {client, headers} = makeSSRClient(request);

  const {error} = await client.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });
  if (error) {  
    return {error: "Failed to send OTP"};
  }
  return redirect(`/auth/otp/complete?email=${email}`);
}

export default function OtpStartPage({actionData}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Login in with OTP</h1>
          <p className="text-sm text-muted-foreground">We will send you a 4-digit code to log in to your account</p>
        </div>
        <Form className="w-full space-y-4" method="post">
          <InputPair 
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            required
            type="email"
            placeholder="i.e wemake@gmail.com"
          />
          {actionData && actionData.error && <p className="text-red-500">{actionData.error}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Send OTP"}</Button>
        </Form>
      </div>
    </div>
    );
} 