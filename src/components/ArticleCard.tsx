import moment from "moment";
import Link from "next/link";
import { createStyles, Paper, Text, Title } from "@mantine/core";

interface ArticleCardProps {
  title: string;
  description: string;
  publishedAt: Date;
  image: string;
  link: string;
}

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    maxWidth: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer",
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
    textShadow: "2px 2px black",
  },

  category: {
    color: theme.white,
    opacity: 0.9,
    fontWeight: 700,
    textShadow: "2px 2px black",
  },

  description: { color: theme.colors.gray[2], textShadow: "1px 1px black" },
}));

export default function ArticleCard({
  title,
  description,
  publishedAt,
  image,
  link,
}: ArticleCardProps) {
  const { classes } = useStyles();

  return (
    <Link href={link}>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{ backgroundImage: `url(${image})` }}
        className={classes.card}
        mb="xl"
      >
        <div>
          <Text className={classes.category} size="md">
            {moment(publishedAt).format("YYYY, MM. DD. HH:mm")}
          </Text>
          <Title order={3} className={classes.title}>
            {title}
          </Title>
          <Text className={classes.description} size="md">
            {description}
          </Text>
        </div>
      </Paper>
    </Link>
  );
}
