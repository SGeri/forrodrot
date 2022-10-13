import { useRouter } from "next/router";

const Blog = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Post: {id}</p>;
};

export default Blog;
