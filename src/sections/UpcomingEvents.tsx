import {
  SimpleGrid,
  Container,
  Title,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { EventCard } from "@components";
import { Event } from "@types";

interface UpcomingEventsProps {
  loading: boolean;
  events: Event[];
}

export default function UpcomingEvents({
  loading,
  events,
}: UpcomingEventsProps) {
  const cards = (events || []).map((event) => (
    <EventCard key={event.id} {...event} />
  ));

  return (
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
    </Container>
  );
}
