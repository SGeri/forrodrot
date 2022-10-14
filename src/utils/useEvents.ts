import { useQuery } from "react-query";
import { Event } from "@types";

export default function useEvents() {
  const { data, isLoading } = useQuery("events", fetchEvents);

  const markers = (data?.events || []).map((event: Event) => ({
    name: event.title,
    x: event.locationX,
    y: event.locationY,
  }));

  return { loading: isLoading, events: data?.events || [], markers };
}

function fetchEvents() {
  return fetch("http://localhost:3000/api/get_events").then((res) =>
    res.json()
  );
}
