import { useQuery } from "react-query";
import { Event } from "@types";
import { API } from "@utils";

export default function useEvents() {
  const { data, isLoading, refetch } = useQuery("events", () =>
    API.getEvents()
  );

  const markers = (data?.events || []).map((event: Event) => ({
    name: event.title,
    hidden: event.hidden,
    link: event.link,
    x: event.locationX,
    y: event.locationY,
  }));

  const allEvents = data?.events || [];
  const upcomingEvents =
    allEvents.filter((event: Event) => !event.hidden) || [];
  const pastEvents = allEvents.filter((event: Event) => event.hidden) || [];

  return {
    events: allEvents,
    upcomingEvents,
    pastEvents,
    loading: isLoading,
    markers,
    refetch,
  };
}
