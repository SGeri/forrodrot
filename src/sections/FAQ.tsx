import { Container, Title, Accordion, createStyles, Box } from "@mantine/core";

const questions = [
  [
    "Ez itt az első kérdés?",
    "Igen, ez az első kérdés, itt pedig ennek a kifejtése van.",
  ],
  [
    "Ez itt az második kérdés?",
    "Igen, ez az első kérdés, itt pedig ennek a kifejtése van.",
  ],
  [
    "Ez itt az harmadik kérdés?",
    "Igen, ez az első kérdés, itt pedig ennek a kifejtése van.",
  ],
];

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.dark[6],
  },

  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },

  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,

    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function FAQ() {
  const { classes } = useStyles();
  return (
    <Box className={classes.root}>
      <Container size="sm" className={classes.wrapper}>
        <Title align="center" className={classes.title}>
          Gyakran Ismételt Kérdések
        </Title>

        <Accordion>
          {questions.map(([question, answer], index) => {
            return (
              <Accordion.Item
                key={index}
                value={index.toString()}
                className={classes.item}
              >
                <Accordion.Control>{question}</Accordion.Control>
                <Accordion.Panel>{answer}</Accordion.Panel>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Container>
    </Box>
  );
}
