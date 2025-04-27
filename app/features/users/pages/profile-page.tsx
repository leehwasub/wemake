import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Profile Page' },
  ];
};

export default function ProfilePage() {
  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">
          I'm proudct designer and I love to design products with Figma and Sketch.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold">About</h4>
        <p className="text-muted-foreground">
          I'm proudct designer and I love to design products with Figma and Sketch.
        </p>
      </div>
    </div>
  );
} 