export type ZoneType = {
    id: string
    id_technicien?: string;
    nom: string;
    color: string;
    polygone: {type: string, coordinates: [number, number][][]} 
};
