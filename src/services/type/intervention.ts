import type { User } from "./auth";
import type { ZoneType } from "./carte";

export type dataBulkIntervention = {
    technicien_id: string;
    zone_id: string;
    date: {  
        from: Date;
        to: Date;
    };
    heure_debut: string;
    heure_fin: string;
}
export type dataBulkInterventionToBack = {
    technicien_id: string;
    zone_id: string;    
    date_debut: Date;
    date_fin: Date;
    heure_debut: number;
    minute_debut: number;
    heure_fin: number;
    minute_fin: number;
    
} 
export type Statut  = "UNPLANNED" | "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type Intervention = {
    adresse: string | null;
    client: User | null;
    client_id: string | null;
    createdAt: Date;
    debut: Date;
    detail: string | null;
    fin: Date;
    forfait_intervention: string | null;
    id: string;
    statut: Statut;
    technicien: User;
    technicien_id: string;
    updatedAt: Date;
    zone: ZoneType;
    zone_id: string;
    
}
export type InterventionUpdate = {
    id: string;
    debut: string;
    fin: string;
    adresse: string | null;
    statut: Statut;
    client_id: string | null;
    technicien_id: string | null;
    detail: string | null;
    forfait_id: string | null;
}