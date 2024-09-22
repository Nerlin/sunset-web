import { ActionIcon, Flex, Group, Image } from "@mantine/core";
import {
  IconArrowAutofitDown,
  IconArrowAutofitUp,
  IconX,
} from "@tabler/icons-react";

import "../styles/SunsetPanelHeader.css";

export interface SunsetPanelHeaderProps {
  minimized: boolean;

  onClose(): void;
  onToggle(): void;
}

export default function SunsetPanelHeader({
  minimized,
  onClose,
  onToggle,
}: SunsetPanelHeaderProps) {
  return (
    <Flex className={"sunset-panel-header"} align={"center"}>
      <Image
        src={"/sun.png"}
        className={"sunset-panel-header__sun"}
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
