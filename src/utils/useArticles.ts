import { useQuery } from "react-query";
import { API } from "@utils";

export default function useArticles(showHidden?: boolean) {
  const { data, isLoading, refetch } = useQuery("articles", () =>
    API.getArticles(showHidden)
  );

  return { loading: isLoading, articles: data?.articles || [], refetch };
}
