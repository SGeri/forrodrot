import { useState } from "react";
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

interface PastEventsProps {
  loading: boolean;
  events: Event[];
}

export default function PastEvents({ loading, events }: PastEventsProps) {
  const [limit, setLimit] = useState(9);
  const { classes } = useStyles();

  const cards = (events.slice(0, limit) || []).map((event) => (
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

        {events.length > limit && (
          <Group position="center" mt="xl">
            <Button size="md" onClick={() => setLimit(limit + 3)}>
              További események betöltése
            </Button>
          </Group>
        )}
      </Container>
    </Box>
  );
}
