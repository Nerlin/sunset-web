import { ActionIcon } from "@mantine/core";
import { IconCompass } from "@tabler/icons-react";
import { LatLngLiteral } from "leaflet";
import { useEffect, useRef } from "react";
import Control from "react-leaflet-custom-control";
import useGeolocation from "../hooks/useGeolocation.ts";

export interface LocateControlProps {
  onLocate(latLng: LatLngLiteral): void;
}

export default function LocateControl({ onLocate }: LocateControlProps) {
  const geolocation = useGeolocation({
    timeout: 3000,
    enableHighAccuracy: true,
  });

  const onLocateRef = useRef(onLocate);
  onLocateRef.current = onLocate;

  useEffect(() => {
    if (geolocation.latitude != null && geolocation.longitude != null) {
      onLocateRef.current({
        lat: geolocation.latitude,
        lng: geolocation.longitude,
      });
    }
  }, [geolocation]);

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
