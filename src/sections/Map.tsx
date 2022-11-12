import Image from "next/image";
import { Center } from "@mantine/core";
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
      <Title weight={700} align="center" mb="xl">
        Eseménytérkép
      </Title>

      <Map
        height={800}
        center={[47.4918469795339, 19.055749810174355]}
        zoom={13}
        scrollWheelZoom={false}
      >
        {markerComponents}
      </Map>

      <Center pt="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Image
            src="/marker-icon-blue.png"
            alt="blue marker"
            width={20}
            height={33}
          />
          <Title size={18} pl="xs">
            Közelgő események
          </Title>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Image
            src="/marker-icon-grey.png"
            alt="grey marker"
            width={20}
            height={33}
          />
          <Title size={18} pl="xs">
            Korábbi események
          </Title>
        </Box>
      </Center>
    </Box>
  );
}
