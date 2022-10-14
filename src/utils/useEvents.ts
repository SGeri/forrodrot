import { useQuery } from "react-query";
import { Event } from "@types";

export default function useEvents() {
  const { data, isLoading, refetch } = useQuery("events", fetchEvents);

  const markers = (data?.events || []).map((event: Event) => ({
    name: event.title,
    x: event.locationX,
    y: event.locationY,
  }));

  return { loading: isLoading, events: data?.events || [], markers, refetch };
}

function fetchEvents() {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/get_events").then((res) =>
    res.json()
  );
}
