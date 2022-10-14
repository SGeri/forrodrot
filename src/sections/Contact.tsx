import Link from "next/link";
import { Group, Title, Button, Box, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    [theme.fn.largerThan("xs")]: {
      paddingLeft: 120,
      paddingRight: 120,
    },

    backgroundColor: theme.colors.dark[7],
    padding: theme.spacing.xl * 2,
  },
}));

export default function Contact() {
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Title
        order={2}
        size="h1"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
        weight={900}
        align="center"
      >
        Kérdésed van?
      </Title>

      <Group position="center" mt="xl">
        <Link href="mailto:info@forrodrot.com">
          <Button size="xl">Írj nekünk!</Button>
        </Link>
      </Group>
    </Box>
  );
}
