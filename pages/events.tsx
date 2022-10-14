import { useEvents } from "@utils";
import { UpcomingEvents } from "@sections";

const Events = () => {
  const { events, loading } = useEvents();

  return <UpcomingEvents loading={loading} events={events} />;
};

export default Events;
