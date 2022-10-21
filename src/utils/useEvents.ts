import { useQuery } from "react-query";
import { Event } from "@types";
import { API } from "@utils";

export default function useEvents(showHidden?: boolean) {
  const { data, isLoading, refetch } = useQuery("events", () =>
    API.getEvents(showHidden)
  );

  const markers = (data?.events || []).map((event: Event) => ({
    name: event.title,
    x: event.locationX,
    y: event.locationY,
  }));

  return { loading: isLoading, events: data?.events || [], markers, refetch };
}
