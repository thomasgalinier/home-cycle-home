import type { User } from "./auth";
import type { ZoneType } from "./carte";
import type { Forfait } from "./forfait";

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
    forfait_intervention: ForfaitIntervention | null;
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
    debut?: string;
    fin?: string;
    adresse: string | null;
    statut: Statut;
    client_id: string | null;
    technicien_id: string | null;
    detail: string | null;
    zone_id: string | null;
    forfait_id: string | null;
    forfait_intervention?: ForfaitIntervention | null;
}
export type BookIntervention = {
    id: string;
    adresse: string | null;
    client_id: string | null;
    detail: string | null;
    forfait_id: string | null;
    technicien_id: string | null;
    zone_id: string | null;
    statut: 'PLANNED';
}
type ForfaitIntervention = {
    duree: number;
    id: string;
    forfait: Forfait;
    id_forfait: string;
    id_intervention: string;
    prix: number
}