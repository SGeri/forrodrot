import { useRouter } from "next/router";
import slugify from "slugify";
import { createStyles, Center, Loader, Text, Box } from "@mantine/core";
import { useArticle } from "@utils";

const useStyles = createStyles((theme) => ({
  root: {
    [theme.fn.smallerThan("xs")]: {
      padding: theme.spacing.md,
    },
    [theme.fn.largerThan("xs")]: {
      padding: theme.spacing.xl,
    },
  },
}));

// todo fix react internal error
export default function Article() {
  const { classes } = useStyles();
  const router = useRouter();
  const { name } = router.query;
  const slug = slugify(String(name), { lower: true, locale: "hu" });

  const { article, loading } = useArticle(slug);

  if (!slug)
    return (
      <Center>
        <Text>A cikknév megadása kötelező.</Text>
      </Center>
    );

  if (loading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (!article)
    return (
      <Center>
        <Text>Ilyen cikk nem található.</Text>
      </Center>
    );

  return (
    <Box className={classes.root}>
      <div dangerouslySetInnerHTML={{ __html: article?.content ?? "Haló" }} />
    </Box>
  );
}
