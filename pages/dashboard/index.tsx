import { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { showNotification } from "@mantine/notifications";
import { Box, Table, LoadingOverlay, Center, ActionIcon } from "@mantine/core";
import { PencilPlus } from "tabler-icons-react";
import { createStyles, Text } from "@mantine/core";
import { Event } from "@types";
import { useEvents, API } from "@utils";
import { EventForm, PageHead } from "@components";

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
  const [event, setEvent] = useState<Event>();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!session?.user) router.replace("/api/auth/signin");
  });

  const { events, refetch, loading } = useEvents();

  const rows = events.map((event: Event) => (
    <tr key={event.id}>
      <td className={classes.pointer} onClick={() => handleEdit(event)}>
        {event.title}
      </td>
      <td>{moment(event.date).format("YYYY, MM. DD. HH:mm")}</td>
      <td>{event.locationName}</td>
      <td>{event.link}</td>
    </tr>
  ));

  const resetForm = () => {
    setShowForm(false);
    setEvent(undefined);
    setShowForm(true);
  };

  const handleAdd = () => {
    resetForm();
  };

  const handleEdit = (event: Event) => {
    setEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const res = await API.deleteEvent(id);

    if (!res) return;

    showNotification({
      title: "Sikeres művelet",
      message: "Az eseményt sikeresen törölted!",
      color: "green",
    });

    setShowForm(false);
    refetch();
  };

  const handleFormSubmit = async (event: Event) => {
    const isEditing = !!event.id;

    const res = isEditing
      ? await API.editEvent(event)
      : await API.addEvent(event);

    if (!res) return;

    showNotification({
      title: "Sikeres művelet",
      message: isEditing
        ? "Az eseményt sikeresen szerkesztetted!"
        : "Az eseményt sikeresen hozzáadtad!",
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
          <Link href="/dashboard/articles">
            <Box className={classes.actionsContainer}>
              <ActionIcon variant="default" size={30} color="green">
                <PencilPlus />
              </ActionIcon>
              <Text m="md" weight={700}>
                Cikkek
              </Text>
            </Box>
          </Link>
        </Center>

        {showForm && (
          <EventForm
            key={event?.id}
            event={event}
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
              <th>Megnevezése</th>
              <th>Dátum és időpont</th>
              <th>Helyszín</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Box>
    </>
  );
};

export default Dashboard;
