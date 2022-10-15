import { useQuery } from "react-query";

export default function useArticles() {
  const { data, isLoading, refetch } = useQuery("articles", fetchArticles);

  return { loading: isLoading, articles: data?.articles || [], refetch };
}

function fetchArticles() {
  return fetch("/api/articles/get_articles").then((res) => res.json());
}
