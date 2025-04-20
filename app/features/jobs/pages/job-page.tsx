import { Badge } from "~/common/components/ui/badge";
import type { Route } from "./+types/job-page";
import { DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "Job Pages | wemake"},
    {name: "description", content: "Find ideas for your next project"},
  ]
}

export default function JobPage() {
  return (
    <div>
      <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-6 -mt-20 relative gap-20 items-start">
        <div className="col-span-4 space-y-10">
          <div className="size-40 bg-white rounded-full overflow-hidden relative left-10">
            <img src="https://github.com/facebook.png" alt="company logo" className="object-cover" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Full Stack Engineer</h1>
            <h4 className="text-lg text-muted-foreground">Meta Inc.</h4>
          </div>
          <div className="flex gap-2">
            <Badge variant={"secondary"}>Full Time</Badge>
            <Badge variant={"secondary"}>Remote</Badge>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ullam recusandae beatae praesentium aspernatur, 
              laboriosam quos, qui omnis vitae quasi minima, quidem cumque. Sed deleniti perspiciatis ducimus qui, provident consequuntur!
            </p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-lg list-disc list-inside">
              {
                [
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ullam recusandae beatae praesentium aspernatur,",
                  "laboriosam quos, qui omnis vitae quasi minima, quidem cumque. Sed deleniti perspiciatis ducimus qui, provident consequuntur!",
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit.adsdasads",
                ].map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              }
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside">
              {
                [
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ullam recusandae beatae praesentium aspernatur,",
                  "laboriosam quos, qui omnis vitae quasi minima, quidem cumque. Sed deleniti perspiciatis ducimus qui, provident consequuntur!",
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit.adsdasads",
                ].map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              }
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside">
              {
                [
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ullam recusandae beatae praesentium aspernatur,",
                  "laboriosam quos, qui omnis vitae quasi minima, quidem cumque. Sed deleniti perspiciatis ducimus qui, provident consequuntur!",
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit.adsdasads",
                ].map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              }
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-lg list-disc list-inside">
              {
                [
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "Express",
                  "PostgreSQL",
                  "Docker",
                  "AWS",
                ].map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="col-span-2 space-y-10 mt-32 sticky top-20 p-6 border rounded-lg">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Avg. Salary</span>
            <span className="text-2xl font-medium">$100,000 - $120,000</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-2xl font-medium">Remote</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-2xl font-medium">Full Time</span>
          </div>
          <div className="flex">
            <span className="text-sm text-muted-foreground">Posted 2 days ago</span>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">3095 Views</span>
          </div>
          <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  );
} 