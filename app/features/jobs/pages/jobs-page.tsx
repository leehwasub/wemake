import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/jobs-page";
import { JobCard } from "../components/job-card";
import { Button } from "~/common/components/ui/button";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RNAGE } from "../constants";
import { data, Link, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { getJobs } from "../queries";
import { z } from "zod";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "Jobs | wemake"},
    {name: "description", content: "Find jobs for your next project"},
  ]
}

const searchParamsSchema = z.object({
  type: z.enum(JOB_TYPES.map((jobType) => jobType.value) as [string, ...string[]]).optional(),
  location: z.enum(LOCATION_TYPES.map((locationType) => locationType.value) as [string, ...string[]]).optional(),
  salary: z.enum(SALARY_RNAGE).optional(),
});

export const loader = async ({request} : Route.LoaderArgs) => {
  const url = new URL(request.url);
  const {success, data: parsedData} = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw data(
      {
        message: "Invalid search params",
        error_code: "INVALID_SEARCH_PARAMS",
      },
      {
        status: 400,
      }
    );
  }
  const jobs = await getJobs({
    limit: 40,
    location: parsedData.location,
    type: parsedData.type,
    salary: parsedData.salary,
  });
  return { jobs };
}

export default function JobsPage({loaderData} : Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  }
  return (
    <div className="space-y-20">
      <Hero title="Jobs" subtitle="Find jobs for your next project"/>
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-5">
          {loaderData.jobs?.map((job) => (
            <JobCard
              key={job.job_id}
              jobId={job.job_id}
              companyLogo={job.company_logo}
              companyName={job.company_name}
              timeAgo={job.created_at}
              jobTitle={job.position}
              salaryRange={job.salary_range}
              type={job.job_type} 
              location={job.location}
              compnayHq={job.company_location}
            />
          ))}
        </div>
        <div className="xl:col-span-2 sticky top-20 flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((jobType) => (
                <Button variant={"outline"} onClick={() => onFilterClick("type", jobType.value)} className={cn(jobType.value === searchParams.get("type") ? "bg-accent" : "")}>
                  {jobType.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Location</h4>
            <div className="flex flex-wrap gap-2">
              {LOCATION_TYPES.map((locationType) => (
                <Button variant={"outline"} onClick={() => onFilterClick("location", locationType.value)} className={cn(locationType.value === searchParams.get("location") ? "bg-accent" : "")}>
                  {locationType.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Salary Range</h4>
            <div className="flex flex-wrap gap-2">
              {SALARY_RNAGE.map((salaryRange) => (
                <Button variant={"outline"} onClick={() => onFilterClick("salary", salaryRange)} className={cn(salaryRange === searchParams.get("salary") ? "bg-accent" : "")}>
                  {salaryRange}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 