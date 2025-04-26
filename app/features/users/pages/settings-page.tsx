import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Settings Page' },
  ];
};

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
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
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <Form className="flex flex-col w-1/2 gap-5">
            <InputPair
              label="Name"
              name="name"
              type="text"
              placeholder="John Doe"
              description="Your public name"
              required
            />
            <SelectPair 
              name="role" 
              label="Role" 
              description="What role do you do identify the most with" 
              placeholder="Select a role" 
              options={[
                { label: "Software Engineer", value: "software-engineer" },
                { label: "Product Manager", value: "product-manager" },
                { label: "Designer", value: "designer" },
                { label: "Other", value: "other" },
              ]} 
            />
            <InputPair
              label="Bio"
              name="bio"
              type="text"
              placeholder="I'm a software engineer"
              description="Your public bio. It will be displayed on your profile."
              required
              textArea
            />
            <Button className="w-full" type="submit">Update Profile</Button>
          </Form>
        </div>
        <aside className="col-span-2 p-6 rounded-lg border shadow-md">
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
        </aside>
      </div>
    </div>
  );
} 