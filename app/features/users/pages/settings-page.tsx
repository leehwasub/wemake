import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { getLoggedInUserId, getUserById } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { updateUser, updateUserAvatar } from "../mutations";
import { Alert, AlertDescription, AlertTitle } from "~/common/components/ui/alert";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Settings Page' },
  ];
};

export const loader = async ({request} : Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, {id: userId});
  return {user};
}

const formSchema = z.object({
  name: z.string().min(3),
  role: z.string().min(1),
  headline: z.string().optional().default(""),
  bio: z.string().optional().default(""),
});

export const action = async ({request} : Route.ActionArgs) => {
  const {client, headers} = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const avatar = formData.get("avatar");
  if (avatar && avatar instanceof File) {
    if (avatar.size <= 1024 * 1024 * 2 && avatar.type.startsWith("image/")) {
      const {data, error} = await client.storage.from("avatars").upload(`${userId}/${Date.now()}`, avatar, {
        contentType: avatar.type,
        upsert: false,
      });
      if (error) {
        return {error: error.message};
      }
      const {data: {publicUrl}} = await client.storage.from("avatars").getPublicUrl(data.path);
      await updateUserAvatar(client, {id: userId, avatar: publicUrl});
      return {ok: true};
    }
    else
    {
      return {error: "Invalid avatar"};
    }
  }
  else
  {
    const {success, error, data} = formSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
      return {fieldErrors: error.flatten().fieldErrors};
    }
    const {name, role, headline, bio} = data;
    await updateUser(client, {id: userId, name, role: role as "developer" | "designer" | "marketer" | "founder" | "product-manager", headline, bio});
    return {ok: true};
  }
}

export default function SettingsPage({loaderData, actionData} : Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  }
  return (
    <div className="space-y-20">
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 flex flex-col gap-10">
          {actionData?.ok && 
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your profile has been updated</AlertDescription>
            </Alert>
          }
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <Form className="flex flex-col w-1/2 gap-5" method="post">
            <InputPair
              label="Name"
              name="name"
              type="text"
              placeholder="John Doe"
              description="Your public name"
              required
              defaultValue={loaderData.user.name}
            />
            {actionData?.fieldErrors?.name && <p className="text-red-500">{actionData.fieldErrors.name}</p>}

            <SelectPair
              defaultValue={loaderData.user.role}
              name="role" 
              label="Role" 
              description="What role do you do identify the most with" 
              placeholder="Select a role" 
              options={[
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
                { label: "Product Manager", value: "product-manager" },
                { label: "Marketer", value: "marketer" },
                { label: "Founder", value: "founder" },
              ]} 
            />
            {actionData?.fieldErrors?.role && <p className="text-red-500">{actionData.fieldErrors.role}</p>}

            <InputPair
              label="Headline"
              name="headline"
              type="text"
              placeholder="I'm a software engineer"
              description="An introduction to your profile"
              required
              textArea
              defaultValue={loaderData.user.headline ?? ""}
            />
            {actionData?.fieldErrors?.headline && <p className="text-red-500">{actionData.fieldErrors.headline}</p>}

            <InputPair
              label="Bio"
              name="bio"
              type="text"
              placeholder="I'm a software engineer"
              description="Your public bio. It will be displayed on your profile."
              required
              textArea
              defaultValue={loaderData.user.bio ?? ""}
            />
            {actionData?.fieldErrors?.bio && <p className="text-red-500">{actionData.fieldErrors.bio}</p>}

            <Button className="w-full" type="submit">Update Profile</Button>
          </Form>
        </div>
        <Form className="col-span-2 p-6 rounded-lg border shadow-md" method="post" encType="multipart/form-data">
          <Label className="flex flex-col items-start">Avatar
            <small className="text-muted-foreground">
              The avatar of your profile.
            </small>
          </Label>
          <div className="space-y-5">
            <div className="size-40 rounded-full shadow-xl border border-dashed border-border overflow-hidden mt-5">
              {avatar && <img src={avatar} alt="avatar" className="w-full h-full object-cover"/> }
            </div>
            <Input type="file" className="max-w-1/2" name="avatar" onChange={onChange} required/>
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
            <Button type="submit" className="w-full">Update Avatar</Button>
          </div>
        </Form>
      </div>
    </div>
  );
} 