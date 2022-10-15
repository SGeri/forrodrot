import { useQuery } from "react-query";
import { API } from "@utils";

export default function useArticle(id: string) {
  const { data, isLoading } = useQuery("article", () => API.getArticle(id));

  return { loading: isLoading, article: data?.article };
}
