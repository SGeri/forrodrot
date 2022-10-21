import { useForm } from "@mantine/form";
import {
  createStyles,
  Stack,
  TextInput,
  Box,
  Button,
  Group,
  Checkbox,
} from "@mantine/core";
import { ArticleEditor } from "@components";
import { Article } from "@types";

interface ArticleFormProps {
  onSubmit: (data: any) => void;
  onDelete: (id: string) => void;
  article: Article | undefined;
}

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  editor: {
    height: 500,
    overflow: "scroll",
  },

  form: { maxWidth: 800, width: "100%" },
}));

const getInitialValues = (article?: Article) => ({
  title: article?.title || "",
  description: article?.description || "",
  content: article?.content || "",
  image: article?.image || "",
  hidden: article?.hidden || false,
});

const getFormOptions = (article?: Article) => ({
  initialValues: getInitialValues(article),

  validate: {
    title: (value: string) => value.trim().length < 2,
    description: (value: string) => value.trim().length === 0,
    content: (value: string) => value.trim().length === 0,
    image: (value: string) => value.trim().length === 0,
  },
});

export default function ArticleForm({
  onSubmit,
  onDelete,
  article,
}: ArticleFormProps) {
  const { classes } = useStyles();
  const form = useForm(getFormOptions(article));

  const isEditing = !!article;

  const handleDelete = () => {
    onDelete(article?.id!);
  };

  return (
    <Box className={classes.root}>
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) =>
          onSubmit({ id: article?.id, ...values })
        )}
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
            label="Rövid leírás"
            placeholder="Max. 80 karakter"
            value={form.values.description}
            onChange={(event) =>
              form.setFieldValue("description", event.currentTarget.value)
            }
            error={form.errors.description}
          />
          <TextInput
            required
            label="Háttérkép"
            placeholder="http://kep.hu/kep.jpg"
            value={form.values.image}
            onChange={(event) =>
              form.setFieldValue("image", event.currentTarget.value)
            }
            error={form.errors.image}
          />
          <ArticleEditor
            className={classes.editor}
            value={form.values.content}
            onChange={(event) => form.setFieldValue("content", event)}
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
            label="Rejtett"
            mt={25}
            {...form.getInputProps("hidden", { type: "checkbox" })}
          />
        </Group>
      </form>
    </Box>
  );
}
