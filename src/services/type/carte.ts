export type ZoneType = {
    id: string
    technicien_id?: string;
    nom: string;
    color: string;
    polygone: {type: string, coordinates: [number, number][][]} 
};
