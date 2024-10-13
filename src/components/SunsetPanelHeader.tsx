import cx from "clsx";
import { ActionIcon, Flex, Group, Image } from "@mantine/core";
import {
  IconArrowAutofitDown,
  IconArrowAutofitUp,
  IconX,
} from "@tabler/icons-react";

import "../styles/SunsetPanelHeader.css";

export interface SunsetPanelHeaderProps {
  minimized: boolean;
  sunrise?: boolean;

  onClose(): void;
  onToggle(): void;
}

export default function SunsetPanelHeader({
  minimized,
  sunrise,
  onClose,
  onToggle,
}: SunsetPanelHeaderProps) {
  return (
    <Flex
      className={cx(
        "sunset-panel-header",
        sunrise ? "sunset-panel-header_sunrise" : "sunset-panel-header_sunset",
      )}
      align={"center"}
    >
      <Image
        src={"/sun.png"}
        className={cx(
          "sunset-panel-header-sun",
          sunrise
            ? "sunset-panel-header-sun_sunrise"
            : "sunset-panel-header-sun_sunset",
        )}
        w={64}
        h={64}
        alt={"sun"}
      />

      <Group ml={"auto"}>
        <ActionIcon
          color={"white"}
          variant={"transparent"}
          aria-label={minimized ? "Maximize" : "Minimize"}
          title={minimized ? "Maximize" : "Minimize"}
          onClick={onToggle}
        >
          {minimized ? <IconArrowAutofitDown /> : <IconArrowAutofitUp />}
        </ActionIcon>

        <ActionIcon
          color={"white"}
          variant={"transparent"}
          aria-label={"Close panel"}
          title={"Close panel"}
          onClick={onClose}
        >
          <IconX />
        </ActionIcon>
      </Group>
    </Flex>
  );
}
