import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-product-page";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Label } from "@radix-ui/react-label";
import InputPair from "~/common/components/input-pair";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/common/components/ui/select";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "Submit Product | wemake"},
    {name: "description", content: "Submit a product to wemake"},
  ]
}


export default function SubmitPage({loaderData} : Route.ComponentProps) {
  const [icon, setIcon] = useState<string | null>(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIcon(URL.createObjectURL(file));
    }
  }
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
          <Button type="submit" className="w-full" size="lg">Submit</Button>
        </div>
        <div className="flex flex-col space-y-2">
          <Label className="flex flex-col">Icon
            <small className="text-muted-foreground">
              The icon of your product.
            </small>
          </Label>
          <Input type="file" className="max-w-1/2" name="icon" onChange={onChange} required/>
          <div className="flex flex-col text-xs">
            <span className="text-muted-foreground">
              Recommanded size: 128x128px
            </span>
            <span className="text-muted-foreground">
              Allowed formats: PNG, JPEG
            </span>
            <span className="text-muted-foreground">
              Max file size: 1MB
            </span>
          </div>
          <div className="size-40 rounded-xl shadow-xl border border-dashed border-border overflow-hidden">
            {icon && <img src={icon} alt="icon" className="w-full h-full object-cover"/> }
          </div>
        </div>
      </Form>
    </div>
  );
} 