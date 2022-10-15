import { Hero, Map, Contact, FAQ, UpcomingEvents } from "@sections";
import { useEvents } from "@utils";

const Home = () => {
  const { events, markers, loading } = useEvents();

  return (
    <>
      <Hero />

      <UpcomingEvents loading={loading} events={events} />

      <Map markers={markers} />

      <FAQ />

      <Contact />
    </>
  );
};

export default Home;
