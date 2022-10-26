import Link from "next/link";
import { Marker as MarkerComponent, Popup } from "react-leaflet";
import { Marker as MarkerType } from "@types";
import { ActiveIcon, PassiveIcon } from "./Icons";
import "leaflet/dist/leaflet.css";

interface MarkerProps extends MarkerType {}

const Marker = ({ name, link, hidden, x, y }: MarkerProps) => (
  <MarkerComponent position={[x, y]} icon={hidden ? PassiveIcon : ActiveIcon}>
    <Popup>
      <Link href={link}>{name}</Link>
    </Popup>
  </MarkerComponent>
);

export default Marker;
