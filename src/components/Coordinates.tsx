import { ActionIcon, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconMap } from "@tabler/icons-react";
import { LatLngLiteral } from "leaflet";
import { useContext } from "react";
import { useMap } from "react-leaflet";
import { SunsetPanelContext, SunsetPanelMediaQuery } from "./SunsetPanel.tsx";

import "../styles/Coordinates.css";

export interface CoordinatesProps {
  className?: string;
  latLng: LatLngLiteral;
}

export default function Coordinates({
  className = "coordinates",
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
          Coordinates:
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
          {latLng.lat}, <br /> {latLng.lng}
        </Text>
      </dd>
    </dl>
  );
}
