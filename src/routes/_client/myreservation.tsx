import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useClientIntervention } from "@/hooks/planning/useClientIntervention";
import { checkAuthentication } from "@/services/checkAuthentication";
import type { Intervention } from "@/services/type/intervention";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_client/myreservation")({
	beforeLoad: async ({ location }) => {
		const user = await checkAuthentication();
		console.log(user);
		if (!user) {
			throw redirect({
				to: "/404",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: RouteComponent,
});


function RouteComponent() {
  const [page, setPage] = useState(1);
	const { data: interventions, isLoading } = useClientIntervention(page);
	
	return (
		<div className="px-10 h-full flex flex-col justify-between">
			<div className="flex flex-col gap-4">
			{!isLoading ? (
				interventions.data.map((intervention: Intervention) => (
					<Card key={intervention.id}>
						<CardHeader className="flex justify-between">
							<div className="flex flex-row gap-4">
								<p>{intervention.forfait_intervention?.forfait.titre}</p>
								<Badge
									variant={
										intervention.statut === "PLANNED"
											? "secondary"
											: intervention.statut === "CANCELLED"
												? "cancel"
												: intervention.statut === "IN_PROGRESS"
													? "success"
													: "default"
									}
								>
									{intervention.statut}
								</Badge>
							</div>
							<div className="flex gap-4">
								<span>
									{new Date(intervention.debut).toLocaleDateString("fr-FR", {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
								{new Date(intervention.debut).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}{" "}
								-{" "}
								{new Date(intervention.fin).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</div>
						</CardHeader>
            <CardContent>
              <p>{intervention.detail}</p>
              <p>à payer: {intervention.forfait_intervention?.prix} €</p>
              <p>{intervention.adresse}</p>
            </CardContent>
					</Card>
				))
			) : (
				<div className="flex flex-col gap-4">
					<Skeleton className="w-full h-32" />
					<Skeleton className="w-full h-32" />
				</div>
			)}
			</div>
			{isLoading? <Skeleton className="w-full h-32" /> : (
        <div className="flex justify-between gap-4 my-4">
          <Button disabled={page === 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}><ArrowLeftIcon /></Button>
          <Button disabled={interventions.meta.totalPages === page} onClick={() => setPage((prev) => prev + 1)}><ArrowRightIcon /></Button>
        </div>
      )}
		</div>
	);
}
