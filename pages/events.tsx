import { useEvents } from "@utils";
import { UpcomingEvents, PastEvents } from "@sections";
import { PageHead } from "@components";

const Events = () => {
  const { upcomingEvents, pastEvents, loading } = useEvents();

  return (
    <>
      <PageHead />

      <UpcomingEvents events={upcomingEvents} loading={loading} />
      <PastEvents events={pastEvents} loading={loading} />
    </>
  );
};

export default Events;
