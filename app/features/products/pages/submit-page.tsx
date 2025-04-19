import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Label } from "@radix-ui/react-label";
import InputPair from "~/common/components/input-pair";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/common/components/ui/select";
import SelectPair from "~/common/components/select-pair";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "Submit Product | wemake"},
    {name: "description", content: "Submit a product to wemake"},
  ]
}


export default function SubmitPage({loaderData} : Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero 
        title="Submit Your Product" 
        subtitle="Share your product with the world" 
      />
      <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto" method="post">
        <div className="space-y-5">
          <InputPair 
            label="Name" 
            description="This is the name of your product." 
            id="name"
            name="name"
            required
            placeholder="Name of your product"
          />
          <InputPair 
            label="Tagline" 
            description="(60 characters or less)" 
            id="tagline"
            name="tagline"
            required
            placeholder="A concise description of your product"
          />
          <InputPair 
            label="URL" 
            description="The URL of your product." 
            id="url"
            name="url"
            required
            placeholder="https://example.com"
          />
          <InputPair 
            textArea
            label="Description" 
            description="A detailed description of your product." 
            id="description"
            name="description"
            required
            placeholder="A detailed description of your product"
          />
          <SelectPair 
            name="category"
            required
            label="Category"
            description="The category of your product."
            placeholder="Select a category"
            options={[
              {label: "AI", value: "ai"},
              {label: "Productivity", value: "productivity"},
              {label: "Tools", value: "tools"},
              {label: "Entertainment", value: "entertainment"},
              {label: "Other", value: "other"},
            ]}
          />
        </div>
      </Form>
    </div>
  );
} 