import { createStyles, Box } from "@mantine/core";

import { Map, Marker } from "@components";
import { Marker as MarkerType } from "@types";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.dark[5],

    [theme.fn.smallerThan("md")]: {
      padding: theme.spacing.xs * 2,
    },
    [theme.fn.largerThan("md")]: {
      paddingTop: theme.spacing.xs * 2,
      paddingBottom: theme.spacing.xs * 2,
      paddingLeft: 300,
      paddingRight: 300,
    },
  },

  map: {},
}));

interface UpcomingEventsProps {
  markers: MarkerType[];
}

export default function MapSection({ markers }: UpcomingEventsProps) {
  const { classes } = useStyles();

  const markerComponents = (markers || []).map((marker) => (
    <Marker key={marker.name} {...marker} />
  ));

  return (
    <Box className={classes.root}>
      <Map
        height={600}
        className={classes.map}
        center={[47.4918469795339, 19.055749810174355]}
        zoom={13}
        scrollWheelZoom={false}
      >
        {markerComponents}
      </Map>
    </Box>
  );
}
