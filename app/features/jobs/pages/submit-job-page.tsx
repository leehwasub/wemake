import type { Route } from "./+types/submit-job-page";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "Job Pages | wemake"},
    {name: "description", content: "Find ideas for your next project"},
  ]
}

export default function SubmitJobPage() {
  return <div>Submit Job Page</div>;
} 