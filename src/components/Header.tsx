import Image from "next/image";
import {
  createStyles,
  Header,
  Group,
  Burger,
  Container,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderBottom: 0,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  title: {
    color: theme.white,
  },
}));

const guestLinkingOptions = [
  { label: "Események", link: "/events" },
  { label: "Térkép", link: "/map" },
  { label: "Cikkek", link: "/articles" },
];

const userLinkingOptions = [
  ...guestLinkingOptions,
  {
    label: "Szerkesztő",
    link: "/dashboard",
  },
  {
    label: "Kijelentkezés",
    link: "/api/auth/signout",
  },
];

export default function MyHeader() {
  const session = useSession();
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  const links = session.data?.user ? userLinkingOptions : guestLinkingOptions;

  const items = links.map((link) => {
    return (
      <a key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </a>
    );
  });

  return (
    <Header height={56} className={classes.header}>
      <Container>
        <div className={classes.inner}>
          <a href="/">
            <Group>
              <Image src="/logo.png" width={45} height={45} />
              <Text className={classes.title} weight="500">
                Forródrót
              </Text>
            </Group>
          </a>

          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color="#fff"
          />
        </div>
      </Container>
    </Header>
  );
}
