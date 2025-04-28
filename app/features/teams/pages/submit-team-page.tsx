import React from 'react';
import type { Route } from './+types/submit-team-page';
import { Hero } from '~/common/components/hero';
import { Form } from 'react-router';
import InputPair from '~/common/components/input-pair';
import { Button } from '~/common/components/ui/button';
import SelectPair from '~/common/components/select-pair';
import { PRODUCT_STAGES } from '../constants';

export const meta: Route.MetaFunction = () => {
  return [
    { title: `Submit Team | wemake` }
  ];
};

export default function SubmitTeamPage() {
  return (
    <div>
    <Hero 
    title="Create a Team" 
    subtitle="Create a team to start hiring" 
    />
    <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto">
      <div className="grid grid-cols-3 gap-10">
        <InputPair 
          label="What is the name of your product?" 
          name="name" 
          description="(20 characters max)"
          placeholder="i.e. wemake"
          maxLength={20}
          type="text"
          id="name"
          required
        />
        <SelectPair 
          name="stage" 
          label="What is the stage of your product?" 
          description="Select the stage of your product" 
          placeholder="Select a stage" 
          options={PRODUCT_STAGES} 
          required
        />
        <InputPair 
          label="What is the size of your team?" 
          name="size" 
          description="(1-1000)"
          max={1000}
          min={1}
          type="number"
          id="size"
          required
        />
        <InputPair 
          label="How much equity are you willing to give?" 
          name="equity" 
          description="(1-100)"
          max={100}
          min={1}
          type="number"
          id="equity"
          required
        />
        <InputPair 
          label="what roles are you looking for?" 
          placeholder='i.e. React Developer, Backend Developer, etc'
          name="roles" 
          description="(comma separated)"
          maxLength={100}
          type="text"
          id="roles"
          required
        />
        <InputPair 
          label="what is the description of your product?" 
          placeholder='i.e. We are looking for a React Developer who is proficient in TypeScript and React'
          name="description" 
          description="(200 characters max)"
          maxLength={200}
          type="text"
          id="description"
          required
          textArea
        />
      </div>
      <Button type="submit" className="w-full max-w-sm" size="lg">Create Team</Button>
    </Form>
  </div>
  );
} 