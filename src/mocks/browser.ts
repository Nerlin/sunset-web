import { delay, http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { sanitizeEnvUrl } from "../util/env.ts";

const backend = sanitizeEnvUrl(import.meta.env.VITE_BACKEND_URL || "/api");

const handlers = [
  http.get(`${backend}/gettime/:lat/:lng`, async () => {
    await delay();
    return HttpResponse.json({
      occlusion_lat: 39.1670503731652,
      occlusion_long: 46.317377018935,
      occlusion_height: 990,
      occlusion_height_difference: 30,
      occlusion_distance: 6328.27149151494,
      nominal_sunset: "2024-09-21 18:52:00",
      actual_sunset: "2024-09-21 17:24:00",
    });
  }),
];

export const worker = setupWorker(...handlers);
