import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-job-page";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RNAGE } from "../constants";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createJob } from "../mutations";

export const meta : Route.MetaFunction = () => {
  return [
    {title: "Job Pages | wemake"},
    {name: "description", content: "Find ideas for your next project"},
  ]
}

export const loader = async ({request}: Route.LoaderArgs) => {
  const {client} = makeSSRClient(request);
  await getLoggedInUserId(client);
}

export const formSchema = z.object({
  position: z.string().min(1).max(40),
  overview: z.string().min(1).max(400),
  responsibilities: z.string().min(1).max(400),
  qualifications: z.string().min(1).max(400),
  benefits: z.string().min(1).max(400),
  skills: z.string().min(1).max(400),
  companyName: z.string().min(1).max(40),
  companyLogoUrl: z.string().min(1).max(40),
  companyLocation: z.string().min(1).max(40),
  applyUrl: z.string().min(1).max(40),
  jobType: z.enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]]),
  jobLocation: z.enum(LOCATION_TYPES.map((type) => type.value) as [string, ...string[]]),
  salaryRange: z.enum(SALARY_RNAGE),
});

export const action = async ({request}: Route.ActionArgs) => {
  const {client} = makeSSRClient(request);
  await getLoggedInUserId(client);
  const formData = await request.formData();
  const {success, data, error} = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {fieldErrors: error.flatten().fieldErrors};
  }
  const {job_id} = await createJob(client, data);
  return redirect(`/jobs/${job_id}`);
}

export default function SubmitJobPage({actionData}: Route.ComponentProps) {
  return (
    <div>
      <Hero 
      title="Post a Job" 
      subtitle="Reach out to the best developers in the world" 
      />
      <Form method="post" className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto">
        <div className="grid grid-cols-3 gap-10">
          <InputPair 
            id = "position"
            label="Position"
            description="(40 characters max)"
            name="position"
            maxLength={40}
            type="text"
            required
            placeholder="i.e Senior React Developer"
            defaultValue="i.e Senior React Developer"
          />
          {actionData?.fieldErrors?.position && <p className="text-red-500">{actionData.fieldErrors.position}</p>}
          <InputPair 
            id = "overview"
            label="Overview"
            description="(400 characters max)"
            name="overview"
            maxLength={400}
            type="text"
            required
            placeholder="i.e We are looking for a Senior React Developer"
            textArea
            defaultValue="i.e We are looking for a Senior React Developer"
          />
          {actionData?.fieldErrors?.overview && <p className="text-red-500">{actionData.fieldErrors.overview}</p>}
          <InputPair 
            id = "responsibilities"
            label="Responsibilities"
            description="(400 characters max, comma separated)"
            name="responsibilities"
            maxLength={400}
            type="text"
            required
            placeholder="i.e Implement new features, Maintain code quality, etc"
            textArea
            defaultValue="i.e Implement new features, Maintain code quality, etc"
          />
          {actionData?.fieldErrors?.responsibilities && <p className="text-red-500">{actionData.fieldErrors.responsibilities}</p>}
          <InputPair 
            id = "qualifications"
            label="Qualifications"
            description="(400 characters max, comma separated)"
            name="qualifications"
            maxLength={400}
            type="text"
            required
            placeholder="i.e Bachelor's degree in Computer Science, 3 years of experience, etc"
            defaultValue="i.e Bachelor's degree in Computer Science, 3 years of experience, etc"
            textArea
          />
          {actionData?.fieldErrors?.qualifications && <p className="text-red-500">{actionData.fieldErrors.qualifications}</p>}
          <InputPair 
            id = "benefits"
            label="Benefits"
            description="(400 characters max, comma separated)"
            name="benefits"
            maxLength={400}
            type="text"
            required
            placeholder="i.e Flexible working hours, Health insurance, etc"
            defaultValue="i.e Flexible working hours, Health insurance, etc"
            textArea
          />
          {actionData?.fieldErrors?.benefits && <p className="text-red-500">{actionData.fieldErrors.benefits}</p>}
          <InputPair 
            id = "skills"
            label="Skills"
            description="(400 characters max, comma separated)"
            name="skills"
            maxLength={400}
            type="text"
            required
            placeholder="i.e React, TypeScript, etc"
            textArea
            defaultValue="i.e React, TypeScript, etc"
          />
          {actionData?.fieldErrors?.skills && <p className="text-red-500">{actionData.fieldErrors.skills}</p>}
          <InputPair 
            id = "companyName"
            label="Company Name"
            description="(40 characters max)"
            name="companyName"
            maxLength={40}
            type="text"
            required
            placeholder="i.e wemake"
            defaultValue="i.e wemake"
          />
          {actionData?.fieldErrors?.companyName && <p className="text-red-500">{actionData.fieldErrors.companyName}</p>}
          <InputPair 
            id = "companyLogoUrl"
            label="Company Logo URL"
            description="(40 characters max)"
            name="companyLogoUrl"
            maxLength={40}
            type="url"
            required
            placeholder="i.e https://example.com/logo.png"
            defaultValue="i.e https://example.com/logo.png"
          />
          {actionData?.fieldErrors?.companyLogoUrl && <p className="text-red-500">{actionData.fieldErrors.companyLogoUrl}</p>}
          <InputPair 
            id = "companyLocation"
            label="Company Location"
            description="(40 characters max)"
            name="companyLocation"
            maxLength={40}
            type="text"
            required
            placeholder="i.e San Francisco, CA"
            defaultValue="i.e San Francisco, CA"
          />
          {actionData?.fieldErrors?.companyLocation && <p className="text-red-500">{actionData.fieldErrors.companyLocation}</p>}
          <InputPair 
            id = "applyUrl"
            label="Apply URL"
            description="(40 characters max)"
            name="applyUrl"
            maxLength={40}
            type="url"
            required
            placeholder="i.e https://example.com/apply"
            defaultValue="i.e https://example.com/apply"
      />
          {actionData?.fieldErrors?.applyUrl && <p className="text-red-500">{actionData.fieldErrors.applyUrl}</p>}
          <SelectPair   
            label="Job Type"
            description="Select the type of job"
            name="jobType"
            required
            placeholder="i.e Full-time"
            options={JOB_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          {actionData?.fieldErrors?.jobType && <p className="text-red-500">{actionData.fieldErrors.jobType}</p>}
          <SelectPair   
            label="Job Location"
            description="Select the location of the job"
            name="jobLocation"
            required
            placeholder="i.e Remote"
            options={LOCATION_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          {actionData?.fieldErrors?.jobLocation && <p className="text-red-500">{actionData.fieldErrors.jobLocation}</p>}
          <SelectPair   
            label="Salary Range"
            description="Select the salary range of the job"
            name="salaryRange"
            required
            placeholder="i.e $100,000 - $120,000"
            options={SALARY_RNAGE.map((salary) => ({
              label: salary,
              value: salary,
            }))}
          />
          {actionData?.fieldErrors?.salaryRange && <p className="text-red-500">{actionData.fieldErrors.salaryRange}</p>}
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">Post job for $100</Button>
      </Form>
    </div>
  );
}
