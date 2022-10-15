import { useRouter } from "next/router";

export default function Article() {
  const router = useRouter();

  const { id } = router.query;

  console.log(id);

  return null;
}
