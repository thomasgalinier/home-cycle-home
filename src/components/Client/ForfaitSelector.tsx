import type { Forfait } from "@/services/type/forfait";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Badge } from "../ui/badge";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Input } from "../ui/input";

export function ForfaitSelector({
	forfaits,
	titre,
	setTitre,
	field,
}: {
	forfaits: Forfait[];
	titre: string;
	setTitre: (titre: string) => void;
	field: AnyFieldApi;
}) {
	return (
		<div className="flex flex-col gap-2">
			<Input value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Rechercher une intervention" />
<Carousel className="w-full px-12"> 
  <CarouselContent>
    {forfaits.map((forfait) => (
      <CarouselItem key={forfait.id} className="xl:basis-1/4 sm:basis-1/2 ">
        <Card
          className={`w-full h-full flex justify-between cursor-pointer hover:bg-blue-50 ${
            field.state.value === forfait.id ? "border-2 border-secondary" : ""
          }`}
          onClick={() => field.handleChange(forfait.id)}
        >
          <CardHeader className="flex items-center justify-between">
            <h2>{forfait.titre}</h2>
            <Badge variant="outline">{forfait.prix} €</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-600">{forfait.description}</p>
          </CardContent>
          <CardFooter>
            <Badge>{forfait.categorie_velo}</Badge>
          </CardFooter>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>

  <CarouselPrevious className="left-0 top-1/2" />
  <CarouselNext className="right-0 top-1/2" />
</Carousel>

		</div>
	);
}
