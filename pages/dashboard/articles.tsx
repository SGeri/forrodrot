import { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { PencilPlus, CalendarEvent } from "tabler-icons-react";
import {
  createStyles,
  Box,
  Table,
  LoadingOverlay,
  Center,
  ActionIcon,
  Text,
} from "@mantine/core";
import { Article } from "@types";
import { API, useArticles } from "@utils";
import { ArticleForm, PageHead } from "@components";

const useStyles = createStyles((theme) => ({
  actionsContainer: {
    width: 200,
    height: 60,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    padding: theme.spacing.md,
    margin: theme.spacing.md,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.dark[4],

    cursor: "pointer",
  },

  pointer: {
    cursor: "pointer",
  },
}));

const Dashboard = () => {
  const { data: session } = useSession();
  const { classes } = useStyles();
  const router = useRouter();
  const [article, setArticle] = useState<Article>();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!session?.user) router.replace("/api/auth/signin");
  });

  const { articles, refetch, loading } = useArticles(true);

  const rows = articles.map((article: Article) => (
    <tr key={article.id}>
      <td className={classes.pointer} onClick={() => handleEdit(article)}>
        {article.title}
      </td>
      <td className={classes.pointer}>
        <a target="_blank" rel="noreferrer" href={`/articles/${article.slug}`}>
          {article.slug}
        </a>
      </td>
      <td>{article.authorName}</td>
      <td>{article.description}</td>
      <td>{moment(article.publishedAt).format("YYYY, MM. DD. HH:mm")}</td>
    </tr>
  ));

  const resetForm = () => {
    setShowForm(false);
    setArticle(undefined);
    setShowForm(true);
  };

  const handleAdd = () => {
    resetForm();
  };

  const handleEdit = (article: Article) => {
    setArticle(article);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const res = await API.deleteArticle(id);

    if (!res) return;

    showNotification({
      title: "Sikeres művelet",
      message: "A cikket sikeresen törölted!",
      color: "green",
    });

    setShowForm(false);
    refetch();
  };

  const handleFormSubmit = async (article: Article) => {
    const isEditing = !!article.id;

    const res = isEditing
      ? await API.editArticles(article)
      : await API.addArticle(article);

    if (!res) return;

    showNotification({
      title: "Sikeres művelet",
      message: isEditing
        ? "A cikket sikeresen szerkesztetted!"
        : "A cikket sikeresen hozzáadtad!",
      color: "green",
    });

    !isEditing && setShowForm(false);
    refetch();
  };

  return (
    <>
      <PageHead />

      <Box px="xl">
        <LoadingOverlay visible={loading} overlayBlur={2} />

        <Center>
          <Box className={classes.actionsContainer} onClick={handleAdd}>
            <ActionIcon variant="default" size={30} color="green">
              <PencilPlus />
            </ActionIcon>
            <Text m="md" weight={700}>
              Hozzáadás
            </Text>
          </Box>
          <Link href="/dashboard">
            <Box className={classes.actionsContainer}>
              <ActionIcon variant="default" size={30} color="green">
                <CalendarEvent />
              </ActionIcon>
              <Text m="md" weight={700}>
                Események
              </Text>
            </Box>
          </Link>
        </Center>

        {showForm && (
          <ArticleForm
            key={article?.id}
            article={article}
            onSubmit={(data) => handleFormSubmit(data)}
            onDelete={(id) => handleDelete(id)}
          />
        )}

        <Table
          highlightOnHover
          striped
          horizontalSpacing={15}
          verticalSpacing={15}
        >
          <thead>
            <tr>
              <th>Cikk címe</th>
              <th>Slug</th>
              <th>Szerkesztő</th>
              <th>Rövid leírás</th>
              <th>Publikálás dátuma</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Box>
    </>
  );
};

export default Dashboard;
