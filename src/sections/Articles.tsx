import Link from "next/link";
import { Title, Text, Box, createStyles, SimpleGrid } from "@mantine/core";
import { Article } from "@types";
import { ArticleCard } from "@components";

interface ArticlesProps {
  articles: Article[];
}

const useStyles = createStyles((theme) => ({
  root: {
    [theme.fn.largerThan("xs")]: {
      paddingLeft: 120,
      paddingRight: 120,
    },

    padding: theme.spacing.xl * 2,
  },

  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function Articles({ articles }: ArticlesProps) {
  const { classes } = useStyles();

  const cards = articles.map((article) => (
    <Link href={`/articles/${article.slug}`} key={article.slug}>
      <ArticleCard
        title={article.title}
        description={article.description}
        publishedAt={article.publishedAt!}
        image={article.image}
        link={`/articles/${article.slug}`}
      />
    </Link>
  ));

  return (
    <Box className={classes.root}>
      <Title align="center" className={classes.title}>
        Legfrissebb cikkeink
      </Title>

      {cards.length <= 0 && (
        <Text weight="bold" align="center">
          Jelenleg nincs megjeleníthető esemény!
        </Text>
      )}

      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Box>
  );
}
