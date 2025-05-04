import { Form, Link, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";
import type { Route } from "./+types/login-page";

export const action = async ({request}: Route.ActionArgs) => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  return { message: "Login successful" }; 
}

export default function LoginPage({actionData}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
        <Button variant="ghost" asChild className="absolute right-4 top-8">
          <Link to="/auth/join">Join</Link>
        </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Login</h1>
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
          <InputPair 
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            required
            type="password"
            placeholder="Enter your password"
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Logging in..." : "Login"}</Button>
          {actionData?.message && <p className="text-green-500">{actionData.message}</p>}
        </Form>
        <AuthButtons />
      </div>
    </div>
    );
} 