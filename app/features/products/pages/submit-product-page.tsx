import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-product-page";
import { Form, redirect } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Label } from "@radix-ui/react-label";
import InputPair from "~/common/components/input-pair";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/common/components/ui/select";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { getCategories } from "../queries";
import { createProduct } from "../mutations";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "Submit Product | wemake"},
    {name: "description", content: "Submit a product to wemake"},
  ]
}

const formSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  url: z.string().min(1),
  description: z.string().min(1),
  howItWorks: z.string().min(1),
  category: z.coerce.number(),
  icon: z.instanceof(File).refine((file) => file.size <= 1024 * 1024 * 2, {message: "Icon must be less than 2MB"}),
})

export const action = async ({request}: Route.ActionArgs) => {
  const {client} = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const {data, success, error} = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {fieldErrors: error.flatten().fieldErrors};
  }
  const {icon, ...rest} = data;
  const {data: uploadData, error: uploadError} = await client.storage.from("icons").upload(`${userId}/${Date.now()}`, icon, {
    contentType: icon.type,
    upsert: false,
  });
  if (uploadError) {
    return {fieldErrors: {icon: uploadError.message}};
  }
  const {data: {publicUrl}} = await client.storage.from("icons").getPublicUrl(uploadData.path);
  const productId = await createProduct(client, {
    name: rest.name,
    tagline: rest.tagline,
    description: rest.description,
    howItWorks: rest.howItWorks,
    url: rest.url,
    iconUrl: publicUrl,
    categoryId: rest.category,
    userId,
  });
  return redirect(`/products/${productId}`);
}


export const loader = async ({request}: Route.LoaderArgs) => {
  const {client} = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
const categories = await getCategories(client);
  return {categories};
}

export default function SubmitPage({loaderData, actionData} : Route.ComponentProps) {
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
      <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto" method="post" encType="multipart/form-data">
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
          <InputPair 
            textArea
            label="How it works"
            description="A detailed description of how your product works."
            id="howItWorks"
            name="howItWorks"
            placeholder="How it works"
          />
          <SelectPair 
            name="category"

            required
            label="Category"
            description="The category of your product."
            placeholder="Select a category"
            options={loaderData.categories.map((category) => ({
              label: category.name, 
              value: category.category_id.toString()
            }))}
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