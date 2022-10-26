import { useEvents } from "@utils";
import { UpcomingEvents, PastEvents } from "@sections";

const Events = () => {
  const { upcomingEvents, pastEvents, loading } = useEvents();

  return (
    <>
      <UpcomingEvents events={upcomingEvents} loading={loading} />
      <PastEvents events={pastEvents} loading={loading} />
    </>
  );
};

export default Events;
