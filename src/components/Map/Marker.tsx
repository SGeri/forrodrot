import { Marker as MarkerComponent, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MarkerProps {
  name: string;
  x: number;
  y: number;
}

const Marker = ({ name, x, y }: MarkerProps) => {
  return (
    <MarkerComponent position={[x, y]}>
      <Popup>{name}</Popup>
    </MarkerComponent>
  );
};

export default Marker;
