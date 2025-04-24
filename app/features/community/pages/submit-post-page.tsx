import React from 'react';
import { Form } from 'react-router';
import { Hero } from '~/common/components/hero';
import InputPair from '~/common/components/input-pair';
import SelectPair from '~/common/components/select-pair';
import { Button } from '~/common/components/ui/button';

export default function SubmitPostPage() {
  return (
    <div className="space-y-20">
      <Hero 
        title={"Submit a Post"} 
        subtitle={"Share your thoughts and ideas with the community"} 
      />
      <Form className="flex flex-col gap-10 max-w-screen-md mx-auto">
        <InputPair 
          label="Title" 
          name="title" 
          id="title" 
          description="(40 characters or less)"
          required
          placeholder="i.e What is the best productivity tool?" 
        />
        <SelectPair 
          name="category" 
          label="Category" 
          description="Select a category" 
          placeholder="Select a category" 
          options={[
            {label: "Productivity", value: "productivity"}, 
            {label: "Programming", value: "programming"}, 
            {label: "Design", value: "design"}, 
          ]}
        />
        <InputPair 
          label="Content" 
          name="content" 
          id="content" 
          description="(1000 characters or less)"
          required
          placeholder="i.e I'm looking for a tool that can help me manage my time and tasks. What are some good tools out there?"
          textArea
        />
        <Button className="mx-auto" type="submit">Create Discussion</Button>
      </Form>
    </div>
  );
} 