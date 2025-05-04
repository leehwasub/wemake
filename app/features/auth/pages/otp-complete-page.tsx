import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import type { Route } from "./+types/otp-complete-page";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircle } from "lucide-react";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "OTP Complete | wemake"},
  ]
}

const formSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export const action = async ({request}: Route.ActionArgs) => {
  const formData = await request.formData();
  const {success, data, error} = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {fieldErrors: error.flatten().fieldErrors};
  }
  const {email, otp} = data;
  const {client, headers} = makeSSRClient(request);

  const {error: verifyError} = await client.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });
  if (verifyError) {
    return {verifyError: verifyError.message};
  }

  //유저가 로그인하면 헤더에 쿠키가 설정되야한다
  return redirect("/", {headers});
}
  
export default function OtpCompletePage({actionData}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Confirm OTP</h1>
          <p className="text-sm text-muted-foreground">Enter the 4-digit code we sent to your email</p>
        </div>
        <Form className="w-full space-y-4" method="post">
          <InputPair 
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            defaultValue={email || ""}
            required
            type="email"
            placeholder="i.e wemake@gmail.com"
          />
          {actionData && actionData.fieldErrors && <p className="text-red-500">{actionData.fieldErrors.email}</p>}
          <InputPair 
            id="otp"
            label="OTP"
            description="Enter the 4-digit code we sent to your email"
            name="otp"
            required
            type="number"
            placeholder="i.e 1234"
          />
          {actionData && actionData.fieldErrors && <p className="text-red-500">{actionData.fieldErrors.otp}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Verify OTP"}</Button>
          {actionData && actionData.verifyError && <p className="text-red-500">{actionData.verifyError}</p>}
        </Form>
      </div>
    </div>
    );
} 