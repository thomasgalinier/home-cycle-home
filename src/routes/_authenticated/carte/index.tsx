import { createFileRoute } from "@tanstack/react-router";
import { FeatureGroup, MapContainer, Polygon, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { FormContainer } from "@/components/FormContainer";
import SelectUser from "@/components/selectUser";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateZone } from "@/hooks/carte/useCreateZone";
import { useDeleteZone } from "@/hooks/carte/useDeleteZone";
import { useGetZone } from "@/hooks/carte/useGetZone";
import { useUpdateZone } from "@/hooks/carte/useUpdateZone";
import { useTechnicien } from "@/hooks/comptes/useTechnicien";
import type { ZoneType } from "@/services/type/carte";
import { useQueryClient } from "@tanstack/react-query";
import type { DrawEvents } from "leaflet";
import { useState } from "react";
import { EditControl } from "react-leaflet-draw";

export const Route = createFileRoute("/_authenticated/carte/")({
	component: RouteComponent,
});
function RouteComponent() {
	const queryClient = useQueryClient();

	const [drawerOpen, setDrawerOpen] = useState(false);
	const [selectedZone, setSelectedZone] = useState<ZoneType | null>(null);
	console.log(selectedZone);
	
	const { data: techniciens } = useTechnicien();
	const { mutate: deleteZone } = useDeleteZone(queryClient);
	const { data: zones, isLoading } = useGetZone();
	const { mutate: createZone } = useCreateZone(queryClient);
	const { form } = useUpdateZone(
		queryClient,
		selectedZone || {
			id: "",
			nom: "",
			color: "",
			polygone: { type: "Polygon", coordinates: [] },
			technicien_id: "",
		},
		setDrawerOpen,
		setSelectedZone,
	);

	const onDrawCreated = (event: DrawEvents.Created) => {
		const { layer, layerType } = event;
		if (layerType === "polygon") {
			const polygon = layer.toGeoJSON();
			createZone({
				nom: `Zone ${zones.length + 1}`,
				color: "#3388ff",
				polygone: {
					type: "Polygon",
					coordinates: [polygon.geometry.coordinates[0]],
				},
			});
		}
	};
	return (
		<>
			<MapContainer
				center={[45.75, 4.85]}
				zoom={13}
				scrollWheelZoom={true}
				className="mx-auto"
				style={{ height: "95%", width: "100%" }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<FeatureGroup>
					<EditControl
						onCreated={onDrawCreated}
						draw={{
							circle: false,
							marker: false,
							polyline: false,
							rectangle: false,
							circlemarker: false,
						}}
						edit={{
							edit: false,
						}}
						position={"topright"}
					/>
					{isLoading
						? null
						: zones.map((zone: ZoneType) =>
								zone.polygone.coordinates.map((polygon, index) => (
									<Polygon
										key={`${zone.id}-${index}-${selectedZone?.id === zone.id ? "selected" : "normal"}`}
										positions={polygon.map((coord) => [coord[1], coord[0]])}
										color={zone.color}
										fillColor={
											selectedZone?.id === zone.id ? "#000000" : zone.color
										}
										eventHandlers={{
											click: () => {
												setSelectedZone(zone);
												setDrawerOpen(true);
											},
										}}
									/>
								)),
							)}
				</FeatureGroup>
			</MapContainer>
			<Drawer open={drawerOpen} direction="right" modal={false}>
				<DrawerContent className="z-[1000]">
					<DrawerHeader className="flex flex-row justify-between items-center">
						<h2 className="text-lg font-medium">Modifier la zone</h2>
						<Button
							variant="secondary"
							onClick={() => {
								selectedZone && deleteZone(selectedZone.id);
							}}
							disabled={!selectedZone}
						>
							Supprimer
						</Button>
					</DrawerHeader>

					<div className="px-4">
						<form.Field name="nom">
							{(field) => (
								<FormContainer>
									<Label htmlFor="nom">Nom de la zone</Label>
									<Input
										id="nom"
										type="text"
										placeholder="Nom de la zone"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
								</FormContainer>
							)}
						</form.Field>
						<form.Field name="color">
							{(field) => (
								<FormContainer>
									<Label htmlFor="color">Couleur de la zone</Label>
									<div className="flex gap-2 items-center">
										<Input
											id="color"
											type="color"
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											className="w-16 h-10 p-1 border rounded cursor-pointer"
										/>
										<Input
											type="text"
											placeholder="#000000"
											value={field.state.value}
											onChange={(e) => {
												field.handleChange(e.target.value);
											}}
											className="flex-1"
											maxLength={7}
										/>
									</div>
								</FormContainer>
							)}
						</form.Field>
						<form.Field name="technicien_id">
							{(field) => (
								<FormContainer>
									<Label htmlFor="technicien_id">Technicien</Label>
									<SelectUser field={field} users={techniciens} />
								</FormContainer>
							)}
						</form.Field>
						<div className="flex flex-row gap-2 w-full justify-end mt-4">
							<Button
								type="submit"
								onClick={form.handleSubmit}
								className=""
							>
								Enregistrer
							</Button>
							<Button onClick={() => setDrawerOpen(false)} variant="outline">Fermer</Button>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</>
	);
}
