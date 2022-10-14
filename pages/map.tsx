import { Center, Title } from "@mantine/core";
import { useEvents } from "@utils";
import { Map } from "@sections";

const MapPage = () => {
  const { markers } = useEvents();

  return <Map markers={markers} />;
};

export default MapPage;
