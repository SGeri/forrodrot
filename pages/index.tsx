import type { NextPage } from "next";
import { Hero, Contact, FAQ } from "@sections";

const Home: NextPage = () => {
  return (
    <>
      <Hero />

      <Contact />

      <FAQ />
    </>
  );
};

export default Home;
