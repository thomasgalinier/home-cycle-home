import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";
import { point, polygon } from "@turf/helpers";
import type { ZoneType } from "./type/carte";
export function msToHHMM(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;


  const hh = hours.toString().padStart(2, '0');
  const mm = minutes.toString().padStart(2, '0');

  return `${hh}:${mm}`;
}
  export const isInZoneGeographique = (
    coordinates: [number, number],
    zones: ZoneType[]
  ): ZoneType | null => {
    const pt = point(coordinates);

    for (const zone of zones) {
      // Turf expects number[][][]; cast our stricter typing for compatibility
      const poly = polygon(zone.polygone.coordinates as unknown as number[][][]);
      if (booleanPointInPolygon(pt, poly)) {
        return zone;
      }
    }
    return null;
  };