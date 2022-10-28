import Head from "next/head";
import moment from "moment";

const tags =
  "forródrót,drót,forró,tanár,pedagógus,strike,sztrájk,tüntetés,kormány,belügyminisztérium,oktatás,élőlánc,közoktatás,forradalom,polgári,engedetlenség,iskola,egyetem,demonstráció";

export interface ArticleHeadProps {
  title: string;
  description: string;
  slug: string;
  image: string;
  publishedAt?: Date;
}

export default function ArticleHead({
  title,
  description,
  slug,
  image,
  publishedAt,
}: ArticleHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="author" content="Forródrót szerkesztői csapat" />
      <meta name="robots" content="index, follow" />
      <meta name="exclusiontags" content={tags} />
      <meta name="keyword" content={tags} />
      <meta name="description" content={description} />

      <meta property="og:type" content="article" />
      <meta property="og:ttl" content="1209600" />
      <meta property="og:site_name" content="Forródrót" />
      <meta property="og:title" content={title} />
      <meta
        property="og:url"
        content={"https://forrodrot.com/articles/" + slug}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="article:publisher" content="https://forrodrot.com" />
      <meta
        property="article:published_time"
        content={publishedAt?.toString() || new Date().toString()}
      />
      <meta property="article:tag" content={tags} />

      <meta
        itemProp="datePublished"
        content={moment(publishedAt).format("YYYY-MM-DD")}
      />

      <link rel="icon" href="/fav_logo.ico" />
    </Head>
  );
}
