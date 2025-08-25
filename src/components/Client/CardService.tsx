
import { Card, CardContent, CardHeader } from "../ui/card";

export function CardService({ title, description }: { title: string; description: string}) {
	return (
		<Card className="w-full  lg:w-1/4">
			<CardHeader className="flex font-bold">
				{title}
			</CardHeader>
			<CardContent>
				<p>{description}</p>
			</CardContent>
		</Card>
	);
}
