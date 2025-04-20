import type { Route } from "./+types/job-page";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "Job Pages | wemake"},
    {name: "description", content: "Find ideas for your next project"},
  ]
}

export default function JobPage() {
  return <div>Job Page</div>;
} 