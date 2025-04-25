import React from 'react';
import type { Route } from './+types/team-page';

export const meta: Route.MetaFunction = ({ params }: Route.MetaArgs) => {
  return [
    { title: `Team Details | wemake` }
  ];
};

export default function TeamPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Team Details</h1>
      <p className="text-muted-foreground">Welcome to the team details page.</p>
    </div>
  );
} 