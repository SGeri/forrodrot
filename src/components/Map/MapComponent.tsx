import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";
import { useViewportSize } from "@mantine/hooks";
import "leaflet/dist/leaflet.css";

interface MapProps extends MapContainerProps {
  height: number;
  children: React.ReactNode;
}

const Map = ({ height, children, ...rest }: MapProps) => {
  const { width } = useViewportSize();

  return (
    <MapContainer
      style={{ height, width: "100%" }}
      scrollWheelZoom={false}
      dragging={true} // TODO: based on viewport size
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
