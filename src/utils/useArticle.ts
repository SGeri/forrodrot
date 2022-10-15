import { useQuery } from "react-query";

export default function useArticle(id: string) {
  const { data, isLoading } = useQuery("article", () => fetchArticle(id));

  console.log("hook id", id);

  console.log("hook data", data);

  return { loading: isLoading, article: data?.article };
}

function fetchArticle(id: string) {
  console.log("fetching with id:", id);

  return fetch("/api/articles/get_article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
}
