import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps extends MapContainerProps {
  height: number;
  children: React.ReactNode;
}

const Map = ({ height, children, ...rest }: MapProps) => {
  return (
    <MapContainer
      style={{ height, width: "100%" }}
      scrollWheelZoom={false}
      {...rest}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default Map;
