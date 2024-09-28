import { Select } from "@mantine/core";
import Control from "react-leaflet-custom-control";
import useLeafletCustomControl from "../hooks/useLeafletCustomControl.ts";

export type TileLayerName = "Default tiles" | "Satellite tiles";

export interface TileLayerControlProps {
  tileLayer: TileLayerName | null;

  onChange(tileLayer: TileLayerName | null): void;
}

const tiles: readonly TileLayerName[] = ["Default tiles", "Satellite tiles"];

export default function TileLayerControl({
  tileLayer,
  onChange,
}: TileLayerControlProps) {
  const ref = useLeafletCustomControl();

  function changeTileLayer(value: string | null) {
    onChange(value as TileLayerName | null);
  }

  return (
    <Control prepend position={"topleft"}>
      <Select
        clearable={false}
        checkIconPosition={"right"}
        comboboxProps={{ zIndex: 1010 }}
        data={tiles}
        ref={ref}
        value={tileLayer}
        onChange={changeTileLayer}
      />
    </Control>
  );
}
