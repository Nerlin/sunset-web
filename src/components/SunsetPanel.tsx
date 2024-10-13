import { Paper, Stack, Transition } from "@mantine/core";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import useLeafletCustomControl from "../hooks/useLeafletCustomControl.ts";
import SunsetPanelHeader from "./SunsetPanelHeader.tsx";

import "../styles/SunsetPanel.css";

export interface SunsetPanelProps {
  children?: ReactNode;
  opened: boolean;
  sunrise?: boolean;
  onClose(): void;
}

export interface SunsetPanelContextData {
  minimized: boolean;
  setMinimized(value: SetStateAction<boolean>): void;
}

export const SunsetPanelContext = createContext<SunsetPanelContextData>({
  minimized: false,
  setMinimized: () => {},
});

export default function SunsetPanel({
  children,
  opened,
  sunrise = false,
  onClose,
}: SunsetPanelProps) {
  const [minimized, setMinimized] = useState(false);
  useEffect(() => {
    setMinimized(!opened);
  }, [opened]);

  const ref = useLeafletCustomControl();

  function toggle() {
    setMinimized((minimized) => !minimized);
  }

  function close() {
    onClose();
  }

  const context = useMemo((): SunsetPanelContextData => {
    return {
      minimized,
      setMinimized,
    };
  }, [minimized]);

  return createPortal(
    <Transition mounted={opened} transition={"fade-left"}>
      {(styles) => (
        <SunsetPanelContext.Provider value={context}>
          <Paper
            component={"aside"}
            className={"sunset-panel"}
            display={"flex"}
            ref={ref}
            shadow={"lg"}
            style={styles}
          >
            <SunsetPanelHeader
              minimized={minimized}
              sunrise={sunrise}
              onClose={close}
              onToggle={toggle}
            />

            {opened && (
              <Transition mounted={!minimized} transition={"fade"}>
                {(styles) => (
                  <Stack className={"sunset-panel__content"} style={styles}>
                    {children}
                  </Stack>
                )}
              </Transition>
            )}
          </Paper>
        </SunsetPanelContext.Provider>
      )}
    </Transition>,
    document.body,
  );
}

export const SunsetPanelMediaQuery = "(width <= 630px)";
