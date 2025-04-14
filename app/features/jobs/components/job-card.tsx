import { Link } from "react-router";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "app/common/components/ui/card";
import { Button } from "app/common/components/ui/button";
import { Badge } from "app/common/components/ui/badge";

interface JobCardProps {
  jobId: string;
  companyLogo: string;
  companyName: string;
  timeAgo: string;
  jobTitle: string;
  salaryRange: string;
  compnayHq: string;
  type: string;
  location: string;
}

export function JobCard({
  jobId,
  companyLogo,
  companyName,
  timeAgo,
  jobTitle,
  salaryRange,
  compnayHq,
  type,
  location,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${jobId}`}>
      <Card className="bg-transparent transition-colors hover:bg-card/50">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <img src={companyLogo} alt="Company Logo" className="size-12 rounded-full" />
            <div className="space-x-2">
              <span className="text-accent-foreground">{companyName}</span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
          </div>
          <CardTitle>{jobTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-1">
          <Badge variant="outline">{type}</Badge>
          <Badge variant="outline">{location}</Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">{salaryRange}</span>
            <span className="text-sm font-medium text-muted-foreground">{compnayHq}</span>
          </div>
          <Button variant="secondary" size="sm">Apply Now</Button>
        </CardFooter>
      </Card>
    </Link>
  );
} 