export type RoleType = "SUPER_ADMIN" | "ADMIN" | "TECHNICIEN" | "CLIENT";
export type User = {
	id: string;
	nom: string;
	prenom: string;
	email: string;
	telephone: string;
	role: RoleType;
	createdAt: Date;
	entreprise_id?: string;
	zone?: {id: string}; 
};
