import { useUpdateForfait } from "@/hooks/forfait/useUpdateForfait"
import type { Forfait } from "@/services/type/forfait"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useQueryClient } from "@tanstack/react-query"
import { EuroIcon } from "lucide-react"
import { FormContainer } from "../FormContainer"
import { FormHelperText } from "../FormHelperText"
import { Button } from "../ui/button"
import { DialogContent } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"


type DialogModificationForfaitProps = {
    forfait: Forfait
}
export const DialogModificationForfait = ({ forfait }: DialogModificationForfaitProps) => {
    const queryClient = useQueryClient();
    const { form } = useUpdateForfait(forfait, queryClient);
    return (
        <DialogContent>
            <DialogTitle>Modification du forfait</DialogTitle>
            <form.Field name="titre" validators={{
                onBlur: ({ value }) =>
                    !value.trim() ? "Le titre est requis" : undefined,
            }}>
                {(field) => (
                    <FormContainer>
                        <Label htmlFor="titre">Titre</Label>
                        <Input
                            id='titre'
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Entrez le titre du forfait"
                        />
                        {field.state.meta.errors.length > 0 && (
                            <FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
                        )}
                    </FormContainer>
                )}
            </form.Field>
            <form.Field
                name="description"
                validators={{
                    onBlur: ({ value }) =>
                        !value.trim() ? "La description est requise" : undefined,
                }}
            >
                {(field) => (
                    <FormContainer>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Entrez la description du forfait"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                        />
                        {field.state.meta.errors.length > 0 && (
                            <FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
                        )}
                    </FormContainer>
                )}
            </form.Field>
            	<form.Field name="type">
					{(field) => (
						<FormContainer>
							<Label htmlFor="type">Type</Label>
							<Select
								value={field.state.value}
								onValueChange={(value) => field.handleChange(value as "reparation" | "entretien")}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Sélectionnez le type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="reparation">Réparation</SelectItem>
									<SelectItem value="entretien">Entretien</SelectItem>
								</SelectContent>
							</Select>
						</FormContainer>
					)}
				</form.Field>
				<form.Field name="categorie_velo">
					{(field) => (
						<FormContainer>
							<Label htmlFor="categorie_velo">Catégorie de vélo</Label>
							<Select
								value={field.state.value}
								onValueChange={(value) => field.handleChange(value as "route" | "vtt" | "ville" | "electrique" | "autre")}
							>
								<SelectTrigger className="w-full" onBlur={field.handleBlur}>
									<SelectValue placeholder="Sélectionnez la catégorie de vélo" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="route">Route</SelectItem>
									<SelectItem value="vtt">VTT</SelectItem>
									<SelectItem value="ville">Ville</SelectItem>
									<SelectItem value="electrique">Électrique</SelectItem>
									<SelectItem value="autre">Autre</SelectItem>
								</SelectContent>
							</Select>
							{field.state.meta.errors.length > 0 && (
								<FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
							)}
						</FormContainer>
					)}
				</form.Field>
				<form.Field name="duree">
					{(field) => (
						<FormContainer>
							<Label htmlFor="duree">Durée</Label>
							<Input
								id="duree"
								type="time"
								placeholder="Entrez la durée du forfait"
								value={field.state.value}
								// onChange={(e) => console.log(e.target.value)}
								onBlur={field.handleBlur}
							/>
							{field.state.meta.errors.length > 0 && (
								<FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
							)}
						</FormContainer>
					)}
				</form.Field>
				<form.Field
					name="prix"
					validators={{
						onBlur: ({ value }) =>
							!value || value === 0 ? "Le prix est requis" : undefined,
					}}
				>
					{(field) => (
						<FormContainer>
							<Label htmlFor="prix">Prix</Label>
							<div className="flex gap-2 items-center">
								<Input
									id="prix"
									placeholder="Entrez le prix du forfait"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
								/>
								<EuroIcon />
							</div>
							{field.state.meta.errors.length > 0 && (
								<FormHelperText>{field.state.meta.errors[0]}</FormHelperText>
							)}
						</FormContainer>
					)}
				</form.Field>
                <Button onClick={form.handleSubmit}>Modifier le forfait</Button>
        </DialogContent>
    )
}