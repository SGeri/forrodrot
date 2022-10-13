import { Marker as MarkerComponent, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Marker = () => {
  return (
    <MarkerComponent position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </MarkerComponent>
  );
};

export default Marker;
