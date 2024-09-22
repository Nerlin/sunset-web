import { Paper, Stack, Transition } from "@mantine/core";
import { LatLngLiteral } from "leaflet";
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
import SunsetPanelForm, { SunsetPanelFormValues } from "./SunsetPanelForm.tsx";
import SunsetPanelHeader from "./SunsetPanelHeader.tsx";

import "../styles/SunsetPanel.css";

export interface SunsetPanelProps {
  children?: ReactNode;
  latLng: LatLngLiteral | null;
  loading?: boolean;
  opened: boolean;

  onClose(): void;
  onSubmit(data: SunsetPanelFormValues): void;
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
  latLng,
  loading,
  opened,
  onClose,
  onSubmit,
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
              onClose={close}
              onToggle={toggle}
            />

            {opened && (
              <Transition mounted={!minimized} transition={"fade"}>
                {(styles) => (
                  <Stack
                    className={"sunset-panel__content"}
                    p={"md"}
                    style={styles}
                  >
                    <SunsetPanelForm
                      latLng={latLng}
                      loading={loading}
                      onSubmit={onSubmit}
                    />

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
