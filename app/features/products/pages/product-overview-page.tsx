import { useOutletContext } from "react-router";
import type { Route } from "./+types/product-overview-page";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({params, request} : Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  await client.rpc("track_event", {
    event_type: "product_view",
    event_data: {
      product_id: params.productId,
    },
  });
  return null;
}
export default function ProductOverviewPage() {
  const {productId, description, how_it_works} = useOutletContext<{productId: number, description: string, how_it_works: string}>();
  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <div>
          <h3 className="text-lg font-bold">What is this product?</h3>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <div className="space-y-1">
        <div>
          <h3 className="text-lg font-bold">How does it work?</h3>
          <p className="text-muted-foreground">
            {how_it_works}
          </p>
        </div>
      </div>
    </div>
  );
} 