import type { Intervention } from "@/services/type/intervention";
import type { AnyFieldApi } from "@tanstack/react-form";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";

export function InterventionSelector({
	date,
	setDate,
	interventions,
	field,
}: {
	date: string;
	setDate: (date: string) => void;
	interventions: Intervention[];
	field: AnyFieldApi;
}) {
	return (
		<div className="flex flex-col justify-between gap-2">
			<div className="flex justify-between">
				<Button
					variant="outline"
					onClick={() => {
						const prevDate = new Date(date);
						do {
							prevDate.setDate(prevDate.getDate() - 1);
						} while ([0, 6].includes(prevDate.getDay())); // 0 = Sunday, 6 = Saturday
						setDate(prevDate.toISOString().slice(0, 10));
					}}
				>
					<ArrowLeftIcon />
				</Button>
				<span>{date}</span>
				<Button
					variant="outline"
					onClick={() => {
						const nextDate = new Date(date);
						do {
							nextDate.setDate(nextDate.getDate() + 1);
						} while ([0, 6].includes(nextDate.getDay())); // 0 = Sunday, 6 = Saturday
						setDate(nextDate.toISOString().slice(0, 10));
					}}
				>
					<ArrowRightIcon />
				</Button>
			</div>

			<div className="flex flex-row flex-wrap gap-2">
				{interventions.map((intervention: Intervention) => (
                    <Button
                        variant={field.state.value === intervention.id ? "secondary" : "outline"}
                        key={intervention.id}
                        onClick={() => field.handleChange(intervention.id)}
                    >
                        {new Date(intervention.debut).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(intervention.fin).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Button>

				))}
			</div>
		</div>
	);
}
