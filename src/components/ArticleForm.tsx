import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  createStyles,
  Stack,
  TextInput,
  Box,
  Button,
  Alert,
  Group,
} from "@mantine/core";
import { ArticleEditor } from "@components";
import { Article } from "@types";

import "dayjs/locale/hu";

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
}));

interface ArticleFormProps {
  onSubmit: (data: any) => void;
  onDelete: (id: string) => void;
  article: Article | undefined;
}

const getInitialValues = (article?: Article) => ({
  title: article?.title || "",
  description: article?.description || "",
  content: article?.content || "",
});

export default function ArticleForm({
  onSubmit,
  onDelete,
  article,
}: ArticleFormProps) {
  const { classes } = useStyles();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const form = useForm({
    initialValues: getInitialValues(article ?? undefined),

    validate: {
      title: (value) => value.trim().length < 2,
      description: (value) => value.trim().length === 0,
      content: (value) => value.trim().length === 0,
    },
  });

  const isEditing = !!article;

  const handleDelete = () => {
    onDelete(article?.id!);
  };

  return (
    <Box className={classes.root}>
      <form
        style={{ maxWidth: 800, width: "100%" }}
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
          <ArticleEditor
            className={classes.editor}
            value={form.values.content}
            onChange={(event) => form.setFieldValue("content", event)}
          />
        </Stack>

        <Group>
          <Button type="submit" color="red" mt="xl">
            {isEditing ? "Szerkesztés" : "Létrehozás"}
          </Button>{" "}
          {isEditing && (
            <Button color="red" mt="xl" onClick={handleDelete}>
              Törlés
            </Button>
          )}
        </Group>

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
