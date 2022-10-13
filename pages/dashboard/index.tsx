import moment from "moment";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Box, Table, LoadingOverlay } from "@mantine/core";
import { Event } from "@types";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) router.replace("/api/auth/signin");
  });

  // TODO add utils lib for fetching data
  const { data, isLoading } = useQuery("events", () =>
    fetch("http://localhost:3000/api/get_events").then((res) => res.json())
  );

  const rows = (data?.events || []).map((event: Event) => (
    <tr key={event.id}>
      <td onClick={() => handleEdit(event)} style={{ cursor: "pointer" }}>
        {event.title}
      </td>
      <td>{moment(event.date).format("YYYY, MM. DD. HH:mm")}</td>
      <td>{event.locationName}</td>
      <td>{event.link}</td>
    </tr>
  ));

  const handleEdit = (event: Event) => {
    console.log(event);
  };

  return (
    <Box px="xl">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

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
