import { Link } from "react-router";
import { Card, CardHeader, CardTitle, CardFooter } from "app/common/components/ui/card";
import { Button } from "app/common/components/ui/button";
import { Badge } from "app/common/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "app/common/components/ui/avatar";

interface TeamCardProps {
  teamId: string;
  avatarSrc: string;
  username: string;
  roles: string[];
  projectDescription: string;
}

export function TeamCard({
  teamId,
  avatarSrc,
  username,
  roles,
  projectDescription,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${teamId}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-base leading-loose">
            <Badge variant="secondary" className="inline-flex shadow-sm items-center">
              <span>@{username}</span>
              <Avatar className="size-5">
                <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                <AvatarImage src={avatarSrc} />
              </Avatar>
            </Badge>
            <span> is looking for </span>
            {roles.map((role, index) => (
              <Badge key={index} className="text-base">{role}</Badge>
            ))}
            <span> to build </span>
            <span>{projectDescription}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Button variant="link">Join team &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
} 