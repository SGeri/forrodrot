import { useEvents } from "@utils";
import { PageHead } from "@components";
import { Map } from "@sections";

const MapPage = () => {
  const { markers } = useEvents();

  return (
    <>
      <PageHead />

      <Map markers={markers} />
    </>
  );
};

export default MapPage;
