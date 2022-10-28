import Head from "next/head";

const tags =
  "forródrót,drót,forró,tanár,pedagógus,strike,sztrájk,tüntetés,kormány,belügyminisztérium,oktatás,élőlánc,közoktatás,forradalom,polgári,engedetlenség,iskola,egyetem,demonstráció";

export default function PageHead() {
  return (
    <Head>
      <title>Forródrót</title>
      <meta
        name="description"
        content="Budapesti és országos tüntetések a pedagógus tüntetésekkel és sztrájkkal kapcsolatban."
      />
      <meta name="exclusiontags" content={tags} />
      <meta name="keyword" content={tags} />
      <meta name="robots" content="index,follow" />
      <meta property="og:title" content="Forródrót" />
      <meta property="og:site_name" content="Forródrót" />
      <meta property="og:url" content="forrodrot.com" />
      <meta
        property="og:description"
        content="A Forródrót a közoktatással kapcsolatos polgári kezdeményezések gyűjtőhelye."
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://i.imgur.com/iaj8OnB.png" />

      <link rel="icon" href="/fav_logo.ico" />
    </Head>
  );
}
