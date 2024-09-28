import { ActionIcon, Button, Flex } from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { LatLngLiteral } from "leaflet";
import { CSSProperties, FormEvent, useState } from "react";
import Coordinates from "./Coordinates.tsx";

export interface SunsetPanelFormProps {
  latLng: LatLngLiteral | null;
  loading?: boolean;
  style?: CSSProperties;

  onSubmit(data: SunsetPanelFormValues): void;
}

export interface SunsetPanelFormValues {
  latLng: LatLngLiteral;
  date: Date;
}

export default function SunsetPanelForm({
  latLng,
  loading,
  style,
  onSubmit,
}: SunsetPanelFormProps) {
  const [date, setDate] = useState<Date>(() => new Date());

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (latLng) {
      onSubmit({ latLng, date });
    }
  }

  function changeDate(value: DateValue) {
    if (value) {
      setDate(value);
    } else {
      setDate(new Date());
    }
  }

  return (
    <form onSubmit={submit}>
      <Flex direction={"column"} style={style} gap={"md"}>
        {latLng && (
          <Coordinates
            label={"Observation point coordinates:"}
            latLng={latLng}
          />
        )}

        <DateInput
          label={<strong>Date:</strong>}
          popoverProps={{ zIndex: 1000 }}
          rightSection={
            <ActionIcon variant={"transparent"} size={"sm"} color={"gray"}>
              <IconCalendar />
            </ActionIcon>
          }
          rightSectionPointerEvents={"none"}
          value={date}
          onChange={changeDate}
        />

        <Button
          loading={loading}
          type={"submit"}
          variant="filled"
          color={"teal"}
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
}
