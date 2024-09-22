import { Fieldset, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { SunsetResult } from "../state/Sunset.ts";
import Coordinates from "./Coordinates.tsx";

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
          <Text size={"sm"}>
            The sunset{" "}
            {dayjs().isBefore(actual)
              ? "should happen"
              : "should have happened"}{" "}
            at <br />
            {actual.format("YYYY-MM-DD HH:mm")} (GMT{actual.format("Z")}).
          </Text>

          <Text size={"sm"}>
            {actual.isBefore(data.nominal) ? "Earlier" : "Later"} than nominally
            (at {nominal.format("HH:mm")}).
          </Text>
        </Stack>

        <Coordinates latLng={data.occlusion} />

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
