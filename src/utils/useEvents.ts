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
  const pastEvents =
    allEvents
      .filter((event: Event) => event.hidden)
      .sort((e1: Event, e2: Event) => Number(e2.date) - Number(e1.date)) || [];

  return {
    events: allEvents,
    upcomingEvents,
    pastEvents,
    loading: isLoading,
    markers,
    refetch,
  };
}
