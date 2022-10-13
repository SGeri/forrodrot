import { createStyles, Card, Image, Text, AspectRatio } from "@mantine/core";
import { Event } from "@types";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

export default function EventCard({
  title,
  image,
  date,
  location,
  link,
}: Event) {
  const { classes } = useStyles();

  return (
    <Card
      key={title}
      p="md"
      radius="md"
      component="a"
      href={link}
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={image} alt={title + " eseményborítója"} />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {date}
      </Text>
      <Text color="dimmed" size="xs" weight={700} mt={5}>
        {location}
      </Text>
      <Text className={classes.title} mt={5}>
        {title}
      </Text>
    </Card>
  );
}
