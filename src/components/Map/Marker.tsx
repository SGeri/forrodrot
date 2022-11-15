import Link from "next/link";
import { Marker as MarkerComponent, Popup } from "react-leaflet";
import { Marker as MarkerType } from "@types";
import { ActiveIcon, PassiveIcon, SchoolIcon } from "./Icons";
import "leaflet/dist/leaflet.css";

interface MarkerProps extends MarkerType {}

const Marker = ({ name, link, hidden, x, y }: MarkerProps) => {
  // TODO - make it a prop so we can change color from outside
  let icon = hidden ? PassiveIcon : ActiveIcon;
  !link && (icon = SchoolIcon);

  return (
    <MarkerComponent position={[x, y]} icon={icon}>
      <Popup>{link ? <Link href={link}>{name}</Link> : name}</Popup>
    </MarkerComponent>
  );
};

export default Marker;
