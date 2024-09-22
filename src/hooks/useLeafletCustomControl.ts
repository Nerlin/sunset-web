import L from "leaflet";
import { useCallback } from "react";

export default function useLeafletCustomControl() {
  return useCallback((element: HTMLElement | null) => {
    if (!element) {
      return;
    }

    L.DomEvent.disableClickPropagation(element);
    L.DomEvent.disableScrollPropagation(element);
  }, []);
}
