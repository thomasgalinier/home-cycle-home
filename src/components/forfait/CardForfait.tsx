import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteForfait } from "@/hooks/forfait/useDeleteForfait";
import type { Forfait } from "@/services/type/forfait";
import { useQueryClient } from "@tanstack/react-query";
import { Bike, Clock, EuroIcon, MoreVertical, Pen, Trash } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { DialogModificationForfait } from "./DialogModificationForfait";


type CardForfaitProps = {
	forfait: Forfait;
};
export function CardForfait({ forfait }: CardForfaitProps) {
	const [dialogUpdate, setDialogUpdate] = useState<boolean>(false);
	const queryClient = useQueryClient();
	const deleteForfait = useDeleteForfait(queryClient);
	return (
		<Card className="w-sm min-h-56 flex flex-col justify-between">
			<CardHeader className="flex justify-between">
				<div className="flex gap-2 items-center">
					<p>
						{forfait.titre.charAt(0).toUpperCase() + forfait.titre.slice(1)}
					</p>
					<Badge variant={forfait.type === 'entretien' ? 'secondary' : 'default'}>{forfait.type}</Badge>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger className="cursor-pointer">
						<MoreVertical />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<Dialog open={dialogUpdate} onOpenChange={setDialogUpdate}>
							<DialogTrigger asChild onClick={() => setDialogUpdate(true)}>
								<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
									<Pen />
									<p>Modifier</p>
								</DropdownMenuItem>
							</DialogTrigger>
							<DialogModificationForfait forfait={forfait} />
						</Dialog>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<DropdownMenuItem
									className="flex gap-2"
									onSelect={(e) => e.preventDefault()}
								>
									<Trash />
									Supprimer
								</DropdownMenuItem>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Supprimer le forfait</AlertDialogTitle>
									<AlertDialogDescription>
										Êtes-vous sûr de vouloir supprimer le forfait{" "}
										{forfait.titre} ?
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Annuler</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => deleteForfait.mutate(forfait.id)}
									>
										Supprimer
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardHeader>

			<CardContent className="flex flex-col gap-2">
				<p className="text-xs text-muted-foreground break-words">{forfait.description}</p>
			</CardContent>
			<CardFooter className="flex justify-between items-center">
				<div className="flex items-center gap-1">
					<span className="text-sm">{forfait.prix} </span>
					<EuroIcon size={14} />
				</div>
				<div className="flex items-center gap-1">
					<span className="text-sm">{forfait.duree}</span>
					<Clock size={14} />
				</div>
				<div className="flex items-center gap-1">
					<span className="text-sm">{forfait.categorie_velo}</span>
					<Bike size={14} />
				</div>
			</CardFooter>
		</Card>
	);
}
