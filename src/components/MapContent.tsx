import { Alert, Stack, Tabs } from "@mantine/core";
import { IconInfoCircle, IconSunrise, IconSunset2 } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import L, { LatLngLiteral, LeafletMouseEvent } from "leaflet";
import { useState } from "react";
import { Marker, Tooltip, useMap, useMapEvent } from "react-leaflet";
import { getSunrise, getSunset } from "../state/Sunset.ts";
import LocateControl from "./LocateControl.tsx";
import SunsetInfo from "./SunsetInfo.tsx";
import SunsetPanel from "./SunsetPanel.tsx";
import SunsetPanelForm, { SunsetPanelFormValues } from "./SunsetPanelForm.tsx";

export default function MapContent() {
  const map = useMap();
  const [latLng, setLatLng] = useState<LatLngLiteral | null>(null);
  const [tab, setTab] = useState<string | null>("sunset");

  const {
    isPending: isPendingSunset,
    data: sunsetInfo,
    error: sunsetError,
    mutate: loadSunset,
    reset: resetSunset,
  } = useMutation({
    mutationFn: async (form: SunsetPanelFormValues) => getSunset(form),
  });

  const {
    isPending: isPendingSunrise,
    data: sunriseInfo,
    error: sunriseError,
    mutate: loadSunrise,
    reset: resetSunrise,
  } = useMutation({
    mutationFn: async (form: SunsetPanelFormValues) => getSunrise(form),
  });

  function locate(latLng: LatLngLiteral) {
    map.flyTo(latLng);
    setLatLng(latLng);
  }

  function putMarker(event: LeafletMouseEvent) {
    setLatLng(event.latlng);
  }

  function reset() {
    setLatLng(null);
    resetSunset();
    resetSunrise();
  }

  useMapEvent("click", putMarker);
  return (
    <>
      {latLng && <Marker position={latLng} />}
      {sunsetInfo && tab === "sunset" && (
        <Marker icon={SunIcon} position={sunsetInfo.occlusion}>
          <Tooltip direction={"bottom"} offset={[0, 5]}>
            Sunset
          </Tooltip>
        </Marker>
      )}

      {sunriseInfo && tab === "sunrise" && (
        <Marker icon={SunIcon} position={sunriseInfo.occlusion}>
          <Tooltip direction={"bottom"} offset={[0, 5]}>
            Sunrise
          </Tooltip>
        </Marker>
      )}

      <SunsetPanel
        opened={latLng != null}
        sunrise={tab === "sunrise"}
        onClose={reset}
      >
        <Tabs color={"orange"} value={tab} onChange={setTab}>
          <Tabs.List grow>
            <Tabs.Tab value={"sunset"} leftSection={<IconSunset2 />}>
              Sunset
            </Tabs.Tab>
            <Tabs.Tab value={"sunrise"} leftSection={<IconSunrise />}>
              Sunrise
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={"sunset"} p={"md"}>
            <Stack>
              <SunsetPanelForm
                latLng={latLng}
                loading={isPendingSunset}
                onSubmit={loadSunset}
              />

              {sunsetError && (
                <Alert
                  variant="filled"
                  color="red"
                  title={"Error"}
                  icon={<IconInfoCircle />}
                >
                  {sunsetError.message ?? sunsetError.toString()}
                </Alert>
              )}

              {sunsetInfo && <SunsetInfo data={sunsetInfo} />}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value={"sunrise"} p={"md"}>
            <Stack>
              <SunsetPanelForm
                latLng={latLng}
                loading={isPendingSunrise}
                onSubmit={loadSunrise}
              />

              {sunriseError && (
                <Alert
                  variant="filled"
                  color="red"
                  title={"Error"}
                  icon={<IconInfoCircle />}
                >
                  {sunriseError.message ?? sunriseError.toString()}
                </Alert>
              )}

              {sunriseInfo && <SunsetInfo data={sunriseInfo} sunrise />}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </SunsetPanel>

      <LocateControl onLocate={locate} />
    </>
  );
}

const SunIcon = new L.Icon({
  iconUrl: "/sun.png",
  iconSize: [24, 24],
});
