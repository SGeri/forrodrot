import { Articles } from "@sections";
import { useArticles } from "@utils";

const ArticlesPage = () => {
  const { articles } = useArticles();

  return <Articles articles={articles} />;
};

export default ArticlesPage;
