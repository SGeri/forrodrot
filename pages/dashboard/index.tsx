import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Box, Table, LoadingOverlay, Center, ActionIcon } from "@mantine/core";
import { Event } from "@types";
import { useEffect, useState } from "react";
import { useEvents } from "@utils";
import { createStyles, Text } from "@mantine/core";
import { PencilPlus, Writing } from "tabler-icons-react";

import { EventForm } from "@components";

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
  const [event, setEvent] = useState<Event>();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!session?.user) router.replace("/api/auth/signin");
  });

  const { events, refetch, loading } = useEvents();

  const rows = events.map((event: Event) => (
    <tr key={event.id}>
      <td onClick={() => handleEdit(event)} style={{ cursor: "pointer" }}>
        {event.title}
      </td>
      <td>{moment(event.date).format("YYYY, MM. DD. HH:mm")}</td>
      <td>{event.locationName}</td>
      <td>{event.link}</td>
    </tr>
  ));

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleEdit = (event: Event) => {
    setEvent(event);
    setShowForm(true);
  };

  const handleSubmit = async (event: Event) => {
    const isEditing = !!event.id;

    if (isEditing) {
      await fetch("/api/events/edit_event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
    } else {
      await fetch("/api/events/add_event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
    }
    refetch();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/events/delete_event", {
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
            <th>Megnevezése</th>
            <th>Dátum és időpont</th>
            <th>Helyszín</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  );
};

export default Dashboard;
