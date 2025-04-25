import React from 'react';
import type { Route } from './+types/teams-page';
import { Hero } from '~/common/components/hero';
import { TeamCard } from '../components/team-card';

export const meta: Route.MetaFunction = ({ params }: Route.MetaArgs) => {
  return [
    { title: `Teams | wemake` }
  ];
};

export default function TeamsPage() {
  return (
    <div className="space-y-20">
      <Hero 
        title="Teams" 
        subtitle="Find your team" 
      />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <TeamCard
            key={index}
            teamId="teamId"
            avatarSrc="https://github.com/inthetiger.png"
            username="nico"
            roles={["React Developer", "Backend Developer", "Product Manager"]}
            projectDescription="a new social media platform"
          />
        ))}
      </div>
    </div>
  );
} 