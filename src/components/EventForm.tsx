import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  createStyles,
  Stack,
  TextInput,
  Box,
  Button,
  Alert,
} from "@mantine/core";
import { TimeInput, DatePicker } from "@mantine/dates";
import { Event } from "@types";

import "dayjs/locale/hu";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface EventFormProps {
  onSubmit: (data: any) => void;
  event: Event | undefined;
}

const getInitialValues = (event?: Event) => ({
  title: event?.title || "",
  image: event?.image || "",
  date: event?.date ? new Date(event?.date) : new Date(),
  time: event?.date ? new Date(event?.date) : new Date(),
  locationName: event?.locationName || "",
  locationX: event?.locationX || "",
  locationY: event?.locationY || "",
  link: event?.link || "",
});

export default function EventForm({ onSubmit, event }: EventFormProps) {
  const { classes } = useStyles();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const form = useForm({
    initialValues: getInitialValues(event ?? undefined),

    validate: {
      title: (value) => value.trim().length < 2,
      image: (value) => value.trim().length === 0,
      date: (value: any) => !value,
      time: (value: any) => !value,
      locationName: (value) => value.trim().length === 0,
      locationX: (value: string) =>
        parseFloat(value) < 45.7 || parseFloat(value) > 48.6,
      locationY: (value: string) =>
        parseFloat(value) < 16 || parseFloat(value) > 22.9,
      link: (value) => value.trim().length === 0,
    },
  });

  const isEditing = !!event;

  const processFormData = (data: any) => {
    const { date, time, ...rest } = data;

    return {
      ...rest,
      id: event?.id,
      date: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      ),
    };
  };

  return (
    <Box className={classes.root}>
      <form
        style={{ maxWidth: 800, width: "100%" }}
        onSubmit={form.onSubmit((values) => onSubmit(processFormData(values)))}
      >
        <Stack>
          <TextInput
            required
            label="Cím"
            placeholder="cím"
            value={form.values.title}
            onChange={(event) =>
              form.setFieldValue("title", event.currentTarget.value)
            }
            error={form.errors.title}
          />
          <TextInput
            required
            label="Borító URL-je"
            placeholder="https://kep.hu/kep.jpg"
            value={form.values.image}
            onChange={(event) =>
              form.setFieldValue("image", event.currentTarget.value)
            }
            error={form.errors.image}
          />
          <DatePicker
            required
            locale="hu"
            label="Dátum"
            placeholder="2022.01.01."
            value={form.values.date}
            onChange={(event: any) => form.setFieldValue("date", event)}
            error={form.errors.date}
          />
          <TimeInput
            required
            label="Időpont"
            placeholder="17:00"
            value={form.values.time}
            onChange={(event: any) => form.setFieldValue("time", event)}
            error={form.errors.time}
          />
          <TextInput
            required
            label="Helyszín megnevezése"
            placeholder="Budapest, Oktogon"
            value={form.values.locationName}
            onChange={(event) =>
              form.setFieldValue("locationName", event.currentTarget.value)
            }
            error={form.errors.locationName}
          />
          <TextInput
            required
            label="Helyszín X koordinátája"
            placeholder="47.12345"
            value={form.values.locationX}
            onChange={(event) =>
              form.setFieldValue("locationX", event.currentTarget.value)
            }
            error={form.errors.locationX}
          />
          <TextInput
            required
            label="Helyszín Y koordinátája"
            placeholder="19.12345"
            value={form.values.locationY}
            onChange={(event) =>
              form.setFieldValue("locationY", event.currentTarget.value)
            }
            error={form.errors.locationY}
          />
          <TextInput
            required
            label="Hivatkozás"
            placeholder="https://facebook.com/events/123456789"
            value={form.values.link}
            onChange={(event) =>
              form.setFieldValue("link", event.currentTarget.value)
            }
            error={form.errors.link}
          />
        </Stack>

        <Button type="submit" color="red" mt="xl">
          {isEditing ? "Szerkesztés" : "Létrehozás"}
        </Button>

        {error && (
          <Box pt="md">
            <Alert title="Hiba történt" color="red" variant="outline">
              {error}
            </Alert>
          </Box>
        )}
      </form>
    </Box>
  );
}
