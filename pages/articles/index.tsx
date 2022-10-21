import { Articles } from "@sections";
import { Article } from "@types";
import { API } from "@utils";

interface ArticlesPageProps {
  articles: string;
}

const ArticlesPage = ({ articles }: ArticlesPageProps) => {
  const articlesJSON = (JSON.parse(articles) || []) as Article[];

  return <Articles articles={articlesJSON} />;
};

export async function getServerSideProps() {
  const { articles } = await API.getArticles();

  return {
    props: {
      articles: JSON.stringify(articles) || [],
    },
  };
}

export default ArticlesPage;
