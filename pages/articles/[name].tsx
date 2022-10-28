import slugify from "slugify";
import { createStyles, Center, Text, Box } from "@mantine/core";
import { API } from "@utils";
import { ArticleHead } from "@components";
import { Article as ArticleType } from "@types";

interface ArticlePageProps {
  article: ArticleType;
}

const useStyles = createStyles((theme) => ({
  root: {
    [theme.fn.smallerThan("sm")]: {
      padding: theme.spacing.md,
    },
    [theme.fn.largerThan("sm")]: {
      padding: theme.spacing.xl,
      paddingLeft: "15%",
      paddingRight: "15%",
    },
  },
}));

export default function Article({ article }: ArticlePageProps) {
  const { classes } = useStyles();

  if (!article)
    return (
      <Center>
        <Text>Ilyen cikk nem található.</Text>
      </Center>
    );

  return (
    <>
      <ArticleHead
        slug={article.slug}
        title={article.title}
        description={article.description}
        image={article.image}
        publishedAt={article.publishedAt}
      />

      <Box className={classes.root}>
        <div
          dangerouslySetInnerHTML={{
            __html: article?.content ?? "A cikknek nem lett megadva tartalom!",
          }}
        />
      </Box>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const slug = slugify(String(context?.params?.name), {
    lower: true,
    locale: "hu",
  });

  const { article } = await API.getArticle(slug);

  // Nested Objects are not supported by getServerSideProps
  return {
    props: {
      article,
    },
  };
}
