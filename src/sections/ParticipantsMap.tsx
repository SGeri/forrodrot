import { createStyles, Box, Title } from "@mantine/core";
import { Map, Marker } from "@components";
import { Marker as MarkerType } from "@types";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.dark[7],

    [theme.fn.smallerThan("md")]: {
      padding: theme.spacing.xs * 2,
    },
    [theme.fn.largerThan("md")]: {
      paddingTop: theme.spacing.xs * 2,
      paddingBottom: theme.spacing.xs * 2,
      paddingLeft: 180,
      paddingRight: 180,
    },
  },
}));

interface ParticipantsMapProps {
  markers: MarkerType[];
}

export default function MapSection({ markers }: ParticipantsMapProps) {
  const { classes } = useStyles();

  const markerComponents = (markers || []).map((marker) => (
    <Marker key={marker.name} {...marker} />
  ));

  return (
    <Box id="map" className={classes.root}>
      <Title weight={700} align="center" mb="xl">
        Iskolák térképe
      </Title>

      <Map
        height={800}
        center={[47.4918469795339, 19.055749810174355]}
        zoom={13}
        scrollWheelZoom={false}
      >
        {markerComponents}
      </Map>
    </Box>
  );
}
