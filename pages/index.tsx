import { Hero, Map, Contact, FAQ, UpcomingEvents, Articles } from "@sections";
import { useEvents, useArticles } from "@utils";

const Home = () => {
  const { upcomingEvents, markers, loading: eventLoading } = useEvents();
  const { articles, loading: articleLoading } = useArticles();

  const commonLoading = eventLoading || articleLoading;

  return (
    <>
      <Hero />

      <UpcomingEvents loading={commonLoading} events={upcomingEvents} />

      <Articles articles={articles} />

      <Map markers={markers} />

      <FAQ />

      <Contact />
    </>
  );
};

export default Home;
