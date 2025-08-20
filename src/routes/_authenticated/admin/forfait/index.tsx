import { CardForfait } from "@/components/forfait/CardForfait";
import { Button } from "@/components/ui/button";
import { useGetForfait } from "@/hooks/forfait/useGetForfait";
import type { Forfait } from "@/services/type/forfait";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/forfait/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: forfaits } = useGetForfait();
  const navigate = useNavigate();
	return (
    <div>

      <Button className="mb-4" onClick={() => navigate({ to: "/forfait/create" })}>Créer un forfait</Button>
		<div className="flex flex-row gap-2 flex-wrap">
			{forfaits?.map((forfait: Forfait) => (
				<div key={forfait.id} >
					<CardForfait forfait={forfait} />
				</div>
			))}
		</div>
    </div>
	)
}
