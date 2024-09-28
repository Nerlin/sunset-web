import { Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { whenShouldHappen } from "../util/date.ts";

export interface SunsetTimeProps {
  date: dayjs.Dayjs;
  label: ReactNode;
}

export default function SunsetTime({ date, label }: SunsetTimeProps) {
  return (
    <Stack gap={0}>
      <Text size={"sm"} fw={"bold"}>
        {label}
      </Text>
      <Text size={"sm"}>
        The sunset {whenShouldHappen(date)} at <br />
        {date.format("YYYY-MM-DD HH:mm")} (GMT{date.format("Z")}).
      </Text>
    </Stack>
  );
}
