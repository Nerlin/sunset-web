import { LatLngLiteral } from "leaflet";
import { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import LocateControl from "./components/LocateControl.tsx";
import MapContent from "./components/MapContent.tsx";
import TileLayerControl, {
  TileLayerName,
} from "./components/TileLayerControl.tsx";

import "./styles/App.css";
import Watermark from "./components/Watermark.tsx";

const defaultCenter: LatLngLiteral = { lat: 39.1833275, lng: 46.3877439 };

function App() {
  const [tileLayer, setTileLayer] = useState<TileLayerName | null>(
    "Default tiles",
  );

  return (
    <MapContainer
      style={{ width: "100vw", height: "100vh" }}
      center={defaultCenter}
      zoom={8}
      zoomControl={false}
    >
      {tileLayer === "Default tiles" ? (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      ) : tileLayer === "Satellite tiles" ? (
        <TileLayer
          attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
        />
      ) : null}

      <LocateControl />
      <MapContent />
      <TileLayerControl tileLayer={tileLayer} onChange={setTileLayer} />

      <ZoomControl position={"bottomleft"} />
      <Watermark />
    </MapContainer>
  );
}

export default App;
