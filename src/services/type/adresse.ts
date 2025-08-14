// Types for the French government address API (api-adresse.data.gouv.fr)

export interface AdresseFeatureProperties {
	label: string;
	score?: number;
	id: string;
	type: string;
	name?: string;
	postcode?: string;
	citycode?: string;
	x?: number;
	y?: number;
	city?: string;
	context?: string;
	importance?: number;
	street?: string;
	housenumber?: string;
}

export interface AdresseFeatureGeometry {
	type: "Point";
	coordinates: [number, number];
}

export interface AdresseFeature {
	type: "Feature";
	geometry: AdresseFeatureGeometry;
	properties: AdresseFeatureProperties;
}

export interface AdresseSearchResponse {
	type: "FeatureCollection";
	version?: string;
	features: AdresseFeature[];
	attribution?: string;
	licence?: string;
	query?: string;
	limit?: number;
}

export type AdresseSuggestion = {
	id: string;
	label: string;
	longitude: number;
	latitude: number;
	city?: string;
	postcode?: string;
	street?: string;
	housenumber?: string;
};
