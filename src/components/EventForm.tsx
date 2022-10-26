import { useForm } from "@mantine/form";
import { TimeInput, DatePicker } from "@mantine/dates";
import {
  createStyles,
  Stack,
  TextInput,
  Box,
  Button,
  Group,
  Checkbox,
} from "@mantine/core";
import { Event } from "@types";

import "dayjs/locale/hu";

interface EventFormProps {
  onSubmit: (data: any) => void;
  onDelete: (id: string) => void;
  event: Event | undefined;
}

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  form: { maxWidth: 800, width: "100%" },
}));

const getInitialValues = (event?: Event) => ({
  title: event?.title || "",
  image: event?.image || "",
  date: event?.date ? new Date(event?.date) : new Date(),
  time: event?.date ? new Date(event?.date) : new Date(),
  locationName: event?.locationName || "",
  locationX: event?.locationX || "",
  locationY: event?.locationY || "",
  link: event?.link || "",
  hidden: event?.hidden || false,
});

const getFormOptions = (event?: Event) => ({
  initialValues: getInitialValues(event),

  validate: {
    title: (value: string) => value.trim().length < 2,
    image: (value: string) => value.trim().length === 0,
    date: (value: Date) => !value,
    time: (value: Date) => !value,
    locationName: (value: string) => value.trim().length === 0,
    locationX: (value: string) =>
      parseFloat(value) < 45.7 || parseFloat(value) > 48.6,
    locationY: (value: string) =>
      parseFloat(value) < 16 || parseFloat(value) > 22.9,
    link: (value: string) => value.trim().length === 0,
  },
});

export default function EventForm({
  onSubmit,
  onDelete,
  event,
}: EventFormProps) {
  const { classes } = useStyles();
  const form = useForm(getFormOptions(event));

  const isEditing = !!event;

  const processFormData = (data: any) => {
    const { date, time, ...rest } = data;

    return {
      id: event?.id,
      date: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      ),
      ...rest,
    };
  };

  const handleDelete = () => {
    onDelete(event?.id!);
  };

  return (
    <Box className={classes.root}>
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => onSubmit(processFormData(values)))}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.preventDefault();
        }}
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

        <Group>
          <Button type="submit" color="red" mt="xl">
            {isEditing ? "Szerkesztés" : "Létrehozás"}
          </Button>
          {isEditing && (
            <Button color="red" mt="xl" onClick={handleDelete}>
              Törlés
            </Button>
          )}
          <Checkbox
            label="Korábbi esemény?"
            mt={25}
            {...form.getInputProps("hidden", { type: "checkbox" })}
          />
        </Group>
      </form>
    </Box>
  );
}
