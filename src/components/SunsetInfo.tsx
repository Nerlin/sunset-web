import { Fieldset, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { SunsetResult } from "../state/Sunset.ts";
import { minutesToHours, whenShouldHappen } from "../util/date.ts";
import Coordinates from "./Coordinates.tsx";
import SunsetTime from "./SunsetTime.tsx";

export interface SunsetInfoProps {
  data: SunsetResult;
}

export default function SunsetInfo({ data }: SunsetInfoProps) {
  const actual = dayjs(data.actual);
  const nominal = dayjs(data.nominal);
  return (
    <Fieldset legend={<strong>Results</strong>} mt={"md"}>
      <Stack gap={"md"}>
        <Stack gap={"xs"}>
          <SunsetTime
            date={actual}
            label={"Accounting for topography, observable sunset:"}
          />

          <SunsetTime date={nominal} label={"Not accounting for topography:"} />

          <Text size={"sm"}>
            Therefore, accounting for topography observable sunset{" "}
            {whenShouldHappen(actual)}{" "}
            <i>{minutesToHours(Math.abs(actual.diff(nominal, "minutes")))}</i>{" "}
            {actual.isBefore(data.nominal) ? "earlier" : "later"} than
            nominally.
          </Text>
        </Stack>

        <Coordinates
          label={"Sun-topo occlusion coordinates:"}
          latLng={data.occlusion}
        />

        <Group gap={0}>
          <Text size={"sm"} fw={"bold"}>
            Sun-topo occlusion height:
          </Text>
          <Text size={"sm"}>
            {Math.abs(data.occlusion.height)}m{" "}
            {data.occlusion.height >= 0 ? "above" : "below"} sea level, <br />
            {Math.abs(data.occlusion.heightDifference)}m{" "}
            {data.occlusion.heightDifference >= 0 ? "above" : "below"} observer
          </Text>
        </Group>

        <Group gap={0}>
          <Text size={"sm"} fw={"bold"}>
            Sun-topo occlusion distance from observer:
          </Text>
          <Text size={"sm"}>{data.occlusion.distance.toFixed(2)}m</Text>
        </Group>
      </Stack>
    </Fieldset>
  );
}
