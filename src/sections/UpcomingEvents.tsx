import { SimpleGrid, Container, Title } from "@mantine/core";
import { EventCard } from "@components";
import { Event } from "@types";

interface UpcomingEventsProps {
  events: Event[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  const cards = (events || []).map((event) => (
    <EventCard key={event.title} {...event} />
  ));

  return (
    <Container py="xl">
      <Title align="center" mb="xl">
        Közelgő rendezvények
      </Title>

      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}
