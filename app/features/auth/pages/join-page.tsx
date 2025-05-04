import { Form, Link, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/join-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";
import { z } from "zod";
import { checkUsernameExists } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircle } from "lucide-react";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "Join | wemake"},
  ]
}

const formSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }).min(3, {message: "Name must be at least 3 cha racters long"}),
  username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  }).min(3, {message: "Username must be at least 3 characters long"}),
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).email({message: "Invalid email address"}),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }).min(8, {message: "Password must be at least 8 characters long"}),
});

export const action = async ({request}: Route.ActionArgs) => {
  const formData = await request.formData();
  const {success, data, error} = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
    }
  }
  const usernameExists = await checkUsernameExists(request, {username: data.username});
  if (usernameExists) {
    return {
      formErrors: {
        username: ["Username already exists"],
      },
    }
  }
  const { client, headers } = makeSSRClient(request);
  const { error: signupError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        username: data.username,
      },
    },
  });
  if (signupError) {
    return {
      signupError: signupError.message,
    }
  }
  return redirect("/", {headers});
}


export default function JoinPage({actionData}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  return (
  <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant="ghost" asChild className="absolute right-4 top-8">
        <Link to="/auth/login">Login</Link>
      </Button>
    <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
      <h1 className="text-2xl font-semibold">Create an account</h1>
      <Form className="w-full space-y-4" method="post">
        <InputPair 
          id="name"
          label="Name"
          description="Enter your name"
          name="name"
          required
          type="text"
          placeholder="Enter your name"
        />
        {actionData && "formErrors" in actionData && <p className="text-red-500">{actionData.formErrors?.name?.join(", ")}</p>}
        <InputPair 
          id="username"
          label="Username"
          description="Enter your username"
          name="username"
          required
          type="text"
          placeholder="i.e wemake"
        />
        {actionData && "formErrors" in actionData && <p className="text-red-500">{actionData.formErrors?.username?.join(", ")}</p>}
        <InputPair 
          id="email"
          label="Email"
          description="Enter your email"
          name="email"
          required
          type="email"
          placeholder="i.e wemake@gmail.com"
        />
        {actionData && "formErrors" in actionData && <p className="text-red-500">{actionData.formErrors?.email?.join(", ")}</p>}
        <InputPair 
          id="password"
          label="Password"
          description="Enter your password"
          name="password"
          required
          type="password"
          placeholder="Enter your password"
        />
        {actionData && "formErrors" in actionData && <p className="text-red-500">{actionData.formErrors?.password?.join(", ")}</p>}
        <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Create account"}</Button>
        {actionData && "signupError" in actionData && <p className="text-red-500">{actionData.signupError}</p>}
      </Form>
      <AuthButtons />
    </div>
  </div>
  );
} 