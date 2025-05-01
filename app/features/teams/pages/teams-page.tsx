import React from 'react';
import type { Route } from './+types/teams-page';
import { Hero } from '~/common/components/hero';
import { TeamCard } from '../components/team-card';
import { getTeams } from '../queries';

export const meta: Route.MetaFunction = ({ params }: Route.MetaArgs) => {
  return [
    { title: `Teams | wemake` }
  ];
};

export const loader = async () => {
  const teams = await getTeams({
    limit: 10,
  });
  return { teams };
};

export default function TeamsPage({loaderData}: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero 
        title="Teams" 
        subtitle="Find your team" 
      />
      <div className="grid grid-cols-4 gap-4">
        {loaderData.teams?.map((team) => (
          <TeamCard
            key={team.team_id}
            teamId={team.team_id}
            avatarSrc={team.team_leader.avatar}
            username={team.team_leader.username}
            roles={team.roles.split(",")}
            projectDescription={team.product_description}
          />
        ))}
      </div>
    </div>
  );
} 