import dynamic from "next/dynamic";
import { Loader } from "@mantine/core";

const ArticleEditor = dynamic(() => import("./ArticleEditorComponent"), {
  loading: () => <Loader />,
  ssr: false,
});

export default ArticleEditor;
