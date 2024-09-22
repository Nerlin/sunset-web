import { ActionIcon } from "@mantine/core";
import { IconCompass } from "@tabler/icons-react";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import useGeolocation from "../hooks/useGeolocation.ts";

export default function LocateControl() {
  const map = useMap();

  const geolocation = useGeolocation({ timeout: 3000 });

  useEffect(() => {
    if (geolocation.latitude != null && geolocation.longitude != null) {
      map.flyTo({ lat: geolocation.latitude, lng: geolocation.longitude });
    }
  }, [map, geolocation]);

  return (
    <Control position={"bottomleft"}>
      <ActionIcon
        bd={"2px solid #ccc"}
        title={"Geolocation"}
        size={"lg"}
        variant={"white"}
        color={"dark"}
        onClick={geolocation.refresh}
      >
        <IconCompass />
      </ActionIcon>
    </Control>
  );
}
