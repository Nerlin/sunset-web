import dayjs from "dayjs";
import { LatLngLiteral } from "leaflet";
import { sanitizeEnvUrl } from "../util/env.ts";

export interface SunsetParams {
  latLng: LatLngLiteral;
  date?: Date;
}

export interface SunsetResult {
  occlusion: LatLngLiteral & {
    height: number;
    heightDifference: number;
    distance: number;
  };
  nominal: Date;
  actual: Date;
}

export async function getSunset({
  latLng,
  date,
}: SunsetParams): Promise<SunsetResult> {
  let url = import.meta.env.VITE_BACKEND_URL || "/api";
  url = sanitizeEnvUrl(url);
  url += `/gettime/${latLng.lat}/${latLng.lng}`;

  const params = new URLSearchParams();
  if (date) {
    params.set("date", dayjs(date).format("YYYY-MM-DD"));
  }
  url += `?${params}`;

  const response = await fetch(url);
  if (response.ok) {
    const json = await response.json();
    return {
      occlusion: {
        lat: json.occlusion_lat,
        lng: json.occlusion_long,
        height: json.occlusion_height,
        heightDifference: json.occlusion_height_difference,
        distance: json.occlusion_distance,
      },
      nominal: new Date(json.nominal_sunset),
      actual: new Date(json.actual_sunset),
    };
  }
  throw new Error(`Failed to load sunset data: HTTP${response.status}.`);
}
