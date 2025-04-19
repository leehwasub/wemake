import { ChevronUpIcon } from "lucide-react";
import { StarIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";

export default function ProductOverviewLayout() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
          <div>
            <h1 className="text-5xl font-bold">Product Name</h1>
            <p className="text-2xl font-light text-muted-foreground">Product Description</p>
            <div className="mt-2 flex items-center gap-5">
              <div className="flex text-yellow-400">
                {Array.from({length: 5}).map((_, index) => (
                  <StarIcon key={index} className="size-4 fill-current" />
                ))}
              </div>
              <span className="text-muted-foreground">100 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant={"secondary"} size={"lg"} className="text-lg h-14 px-10">
            Visit Website
          </Button>
          <Button size={"lg"} className="text-lg h-14 px-10">
            <ChevronUpIcon className="size-4" />
              Upvote (100)
          </Button>
        </div>
      </div>
      <div className="flex gap-2.5">
        <NavLink className={({isActive}) => cn([buttonVariants({variant: "outline"}), isActive && "bg-red-500 text-foreground font-bold"])} to={`/products/1/overview`}>Overview</NavLink>
        <NavLink className={({isActive}) => cn([buttonVariants({variant: "outline"}), isActive && "bg-red-500 text-foreground font-bold"])} to={`/products/1/reviews`}>Reviews</NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

