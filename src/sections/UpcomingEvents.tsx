import { useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import {
  Box,
  createStyles,
  SimpleGrid,
  Container,
  Title,
  LoadingOverlay,
  Text,
  Group,
  Button,
} from "@mantine/core";

import { EventCard } from "@components";
import { Event } from "@types";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.dark[9],
  },
}));

interface UpcomingEventsProps {
  loading: boolean;
  events: Event[];
}

export default function UpcomingEvents({
  loading,
  events,
}: UpcomingEventsProps) {
  const [limit, setLimit] = useState(9);
  const { classes } = useStyles();
  const { width } = useViewportSize();

  const loadMoreSize = width > 767 ? 6 : 3;

  const cards = (events.slice(0, limit) || []).map((event) => (
    <EventCard key={event.id} {...event} />
  ));

  return (
    <Box className={classes.root}>
      <Container py="xl">
        <LoadingOverlay visible={loading} overlayBlur={2} />

        <Title align="center" mb="xl">
          Közelgő rendezvények
        </Title>

        {cards.length <= 0 && (
          <Text weight="bold" align="center">
            Jelenleg nincs megjeleníthető esemény!
          </Text>
        )}

        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {cards}
        </SimpleGrid>

        {events.length > limit && (
          <Group position="center" mt="xl">
            <Button size="md" onClick={() => setLimit(limit + loadMoreSize)}>
              További események betöltése
            </Button>
          </Group>
        )}
      </Container>
    </Box>
  );
}
