export type TCategorieVelo = "route" | "vtt" | "ville" | "electrique" | "autre";
export type Forfait = {
	id: string;
	titre: string;
	type: "reparation" | "entretien";
	description: string;
	duree: string;
	categorie_velo: TCategorieVelo;
	prix: string | number; 
};
