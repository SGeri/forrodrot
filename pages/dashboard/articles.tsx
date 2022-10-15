import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Box, Table, LoadingOverlay, Center, ActionIcon } from "@mantine/core";
import { Article } from "@types";
import { useEffect, useState } from "react";
import { useArticles } from "@utils";
import { createStyles, Text } from "@mantine/core";
import { PencilPlus, CalendarEvent } from "tabler-icons-react";

import { ArticleForm } from "@components";

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

  const { articles, refetch, loading } = useArticles();

  const rows = articles.map((article: Article) => (
    <tr key={article.id}>
      <td onClick={() => handleEdit(article)} style={{ cursor: "pointer" }}>
        {article.title}
      </td>
      <td>{article.description}</td>
      <td>{moment(article.publishedAt).format("YYYY, MM. DD. HH:mm")}</td>
    </tr>
  ));

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleEdit = (article: Article) => {
    setArticle(article);
    setShowForm(true);
  };

  const handleSubmit = async (article: Article) => {
    const isEditing = !!article.id;

    if (isEditing) {
      await fetch("/api/articles/edit_article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
      });
      console.log("Edit event", article);
    } else {
      await fetch("/api/articles/add_article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
      });
      console.log("Add event", article);
    }
    refetch();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/articles/delete_article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setShowForm(false);
    refetch();
  };

  return (
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
          onSubmit={(data) => handleSubmit(data)}
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
            <th>Rövid leírás</th>
            <th>Publikálás dátuma</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  );
};

export default Dashboard;
