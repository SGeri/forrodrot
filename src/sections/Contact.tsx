import { useRef } from "react";
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Box,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import ReCAPTCHA from "react-google-recaptcha";

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

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
      message: (value) => value.trim().length < 10,
    },
  });

  const handleSubmit = async (data: any) => {
    recaptchaRef.current?.execute();

    fetch(
      "http://localhost:3000/api/contact",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
        if (res.status === 200) {
          form.reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box className={classes.root}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
        />

        <Title
          order={2}
          size="h1"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
          weight={900}
          align="center"
        >
          Kérdésed van?
        </Title>

        <SimpleGrid
          cols={2}
          mt="xl"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <TextInput
            label="Név"
            placeholder="Kiss László"
            name="name"
            variant="filled"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email címed"
            placeholder="kisslaci@gmail.com"
            name="email"
            variant="filled"
            {...form.getInputProps("email")}
          />
        </SimpleGrid>

        <TextInput
          label="Üzenet tárgya"
          placeholder="Tárgy"
          mt="md"
          name="subject"
          variant="filled"
          {...form.getInputProps("subject")}
        />
        <Textarea
          mt="md"
          label="Üzenet"
          placeholder="Üzeneted részletesen"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
          {...form.getInputProps("message")}
        />

        <Group position="center" mt="xl">
          <Button type="submit" size="md">
            Küldés
          </Button>
        </Group>
      </form>
    </Box>
  );
}
