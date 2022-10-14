import moment from "moment";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Box, Table, LoadingOverlay, Center, ActionIcon } from "@mantine/core";
import { Event } from "@types";
import { useEffect } from "react";
import { useEvents } from "@utils";
import { createStyles, Text } from "@mantine/core";
import { PencilPlus, Trash, Plus } from "tabler-icons-react";

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

  useEffect(() => {
    if (!session?.user) router.replace("/api/auth/signin");
  });

  const { events, loading } = useEvents();

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
    console.log("add");
  };

  const handleEdit = (event: Event) => {
    console.log(event);
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
      </Center>

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
