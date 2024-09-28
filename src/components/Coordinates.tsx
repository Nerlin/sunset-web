import { ActionIcon, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconMap } from "@tabler/icons-react";
import { LatLngLiteral } from "leaflet";
import { ReactNode, useContext } from "react";
import { useMap } from "react-leaflet";
import { SunsetPanelContext, SunsetPanelMediaQuery } from "./SunsetPanel.tsx";

import "../styles/Coordinates.css";

export interface CoordinatesProps {
  className?: string;
  label?: ReactNode;
  latLng: LatLngLiteral;
}

export default function Coordinates({
  className = "coordinates",
  label = "Coordinates:",
  latLng,
}: CoordinatesProps) {
  const map = useMap();
  const panelContext = useContext(SunsetPanelContext);
  const mobile = useMediaQuery(SunsetPanelMediaQuery);

  function focus() {
    map.flyTo(latLng);
    if (mobile) {
      panelContext.setMinimized(true);
    }
  }

  return (
    <dl className={className}>
      <dt>
        <Text size={"sm"} fw={600}>
          {label}
        </Text>
      </dt>
      <dd className={"coordinates__value"}>
        <ActionIcon
          className={"coordinates__map-icon"}
          pos={"absolute"}
          size={"xs"}
          title={"Show on map"}
          onClick={focus}
        >
          <IconMap />
        </ActionIcon>

        <Text size={"sm"}>
          {latLng.lat.toFixed(6)}, <br /> {latLng.lng.toFixed(6)}
        </Text>
      </dd>
    </dl>
  );
}
