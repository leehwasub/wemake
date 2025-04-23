import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";


export default function LoginPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
        <Button variant="ghost" asChild className="absolute right-4 top-8">
          <Link to="/auth/join">Join</Link>
        </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Login</h1>
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
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            required
            type="password"
            placeholder="Enter your password"
          />
          <Button type="submit" className="w-full">Create account</Button>
        </Form>
      </div>
    </div>
    );
} 