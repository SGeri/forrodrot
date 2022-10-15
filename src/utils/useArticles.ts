import { useQuery } from "react-query";
import { API } from "@utils";

export default function useArticles() {
  const { data, isLoading, refetch } = useQuery("articles", () =>
    API.getArticles()
  );

  return { loading: isLoading, articles: data?.articles || [], refetch };
}
