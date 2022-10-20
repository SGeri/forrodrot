import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  createStyles,
  Header,
  Group,
  Burger,
  Container,
  Text,
  Transition,
  Paper,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },

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

  dropdown: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10000,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
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
      <Link key={link.label} href={link.link}>
        <a className={classes.link}>{link.label}</a>
      </Link>
    );
  });

  return (
    <Header height={56} className={classes.header}>
      <Container>
        <div className={classes.inner}>
          <Link href="/">
            <Group sx={{ cursor: "pointer" }}>
              <Image
                src="/fav_logo.webp"
                width={45}
                height={45}
                alt="fejléc logo"
              />
              <Text className={classes.title} weight="500">
                Forródrót
              </Text>
            </Group>
          </Link>

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

          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
        </div>
      </Container>
    </Header>
  );
}
