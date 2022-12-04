import moment from "moment";
import Link from "next/link";
import { Box, createStyles, Paper, Text, Title } from "@mantine/core";

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
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer",
  },

  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    filter: "blur(3px)",
    borderRadius: theme.radius.lg,
    zIndex: 0,
  },

  overlay: {
    zIndex: 1,
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    textShadow: "1.5px 1.5px black",
    marginTop: theme.spacing.xs,
    wordWrap: "break-word",
    lineHeight: 1.2,
  },

  timestamp: {
    color: theme.white,
    opacity: 0.9,
    fontWeight: 700,
    textShadow: "1.5px 1.5px black",
  },

  description: {
    color: theme.colors.gray[2],
    fontWeight: 500,
    textShadow: "1px 1px black",
    wordWrap: "break-word",
  },
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
      <Paper className={classes.card} radius="lg" shadow="md" p="md" mb="xl">
        <Box
          className={classes.background}
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image})`,
          }}
        />

        <Box className={classes.overlay}>
          <Text className={classes.timestamp} size="md">
            {moment(publishedAt).format("YYYY, MM. DD. HH:mm")}
          </Text>
          <Title className={classes.title} order={3} size={32} mb="xs">
            {title}Alapfogalmak
          </Title>
          <Text className={classes.description} size={22}>
            {description}Gyakran halljuk, hogy sztrájk, polgári engedetlenség,
            Klebelsberg, de mit is jelentenek ezek a kifejezések pontosan? Ebben
            a cikkben összefoglaltuk.
          </Text>
        </Box>
      </Paper>
    </Link>
  );
}
