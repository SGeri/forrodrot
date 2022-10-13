import { Map, Marker } from "@components";
import { Box } from "@mantine/core";

interface UpcomingEventsProps {
  locations: any[];
}

export default function MapSection({ locations }: UpcomingEventsProps) {
  const markers = (locations || []).map((marker) => (
    <Marker key={marker} {...marker} />
  ));

  return (
    <Box>
      <Map
        height={600}
        center={[47.47778775294794, 19.10683169284718]}
        zoom={13}
        scrollWheelZoom={false}
      >
        {markers}
      </Map>
    </Box>
  );
}
