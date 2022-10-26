import {
  Box,
  createStyles,
  SimpleGrid,
  Container,
  Title,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { EventCard } from "@components";
import { Event } from "@types";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.dark[9],
  },
}));

interface PastEventsProps {
  loading: boolean;
  events: Event[];
}

export default function PastEvents({ loading, events }: PastEventsProps) {
  const { classes } = useStyles();

  const cards = (events || []).map((event) => (
    <EventCard key={event.id} {...event} />
  ));

  return (
    <Box className={classes.root}>
      <Container py="xl">
        <LoadingOverlay visible={loading} overlayBlur={2} />

        <Title align="center" mb="xl">
          Korábbi események
        </Title>

        {cards.length <= 0 && (
          <Text weight="bold" align="center">
            Jelenleg nincs megjeleníthető esemény!
          </Text>
        )}

        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
