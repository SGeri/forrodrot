import { useQuery } from "react-query";
import { API } from "@utils";

export default function useArticles(showHidden?: boolean, short?: boolean) {
  const { data, isLoading, refetch } = useQuery("articles", () =>
    API.getArticles(showHidden, short)
  );

  return { loading: isLoading, articles: data?.articles || [], refetch };
}
