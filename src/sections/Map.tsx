import { Map, Marker } from "@components";
import { createStyles, Box } from "@mantine/core";

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
  locations: any[];
}

export default function MapSection({ locations }: UpcomingEventsProps) {
  const { classes } = useStyles();

  const markers = (locations || []).map((marker) => (
    <Marker key={marker.title} {...marker} />
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
        {markers}
      </Map>
    </Box>
  );
}
