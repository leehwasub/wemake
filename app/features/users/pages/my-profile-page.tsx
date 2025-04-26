import { redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";

export function loader({request}: Route.LoaderArgs) {
  return redirect("/users/nico");
}

