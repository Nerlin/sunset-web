import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import L, { LatLngLiteral, LeafletMouseEvent } from "leaflet";
import { useState } from "react";
import { Marker, Tooltip, useMapEvent } from "react-leaflet";
import { getSunset } from "../state/Sunset.ts";
import SunsetInfo from "./SunsetInfo.tsx";
import SunsetPanel from "./SunsetPanel.tsx";
import { SunsetPanelFormValues } from "./SunsetPanelForm.tsx";

export default function MapContent() {
  const [latLng, setLatLng] = useState<LatLngLiteral | null>(null);

  const {
    isPending,
    data,
    error,
    mutate: loadResult,
    reset: resetResult,
  } = useMutation({
    mutationFn: async (form: SunsetPanelFormValues) => getSunset(form),
  });

  function putMarker(event: LeafletMouseEvent) {
    setLatLng(event.latlng);
  }

  function reset() {
    setLatLng(null);
    resetResult();
  }

  useMapEvent("click", putMarker);
  return (
    <>
      {latLng && <Marker position={latLng} />}
      {data && (
        <Marker icon={SunIcon} position={data.occlusion}>
          <Tooltip direction={"bottom"} offset={[0, 5]}>
            Sunset
          </Tooltip>
        </Marker>
      )}

      <SunsetPanel
        latLng={latLng}
        loading={isPending}
        opened={latLng != null}
        onClose={reset}
        onSubmit={loadResult}
      >
        {error && (
          <Alert
            variant="filled"
            color="red"
            title={"Error"}
            icon={<IconInfoCircle />}
          >
            {error.message ?? error.toString()}
          </Alert>
        )}

        {data && <SunsetInfo data={data} />}
      </SunsetPanel>
    </>
  );
}

const SunIcon = new L.Icon({
  iconUrl: "/sun.png",
  iconSize: [24, 24],
});
