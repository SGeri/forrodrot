import { Hero, Map, Contact, FAQ, UpcomingEvents, Articles } from "@sections";
import { useEvents, useArticles } from "@utils";

const Home = () => {
  const { events, markers, loading: eventLoading } = useEvents();
  const { articles, loading: articleLoading } = useArticles();

  const commonLoading = eventLoading || articleLoading;

  return (
    <>
      <Hero />

      <UpcomingEvents loading={commonLoading} events={events} />

      <Map markers={markers} />

      <Articles articles={articles} />

      <FAQ />

      <Contact />
    </>
  );
};

export default Home;
