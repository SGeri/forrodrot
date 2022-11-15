import { useQuery } from "react-query";
import { API } from "@utils";
import { ParticipantsTotal } from "@types";

export default function useParticipants() {
  const { data, isLoading } = useQuery("participants", () =>
    API.getParticipants()
  );

  return {
    total: (data?.total ?? {
      schools: 0,
      participants: 0,
    }) as ParticipantsTotal,
    list: (data?.list ?? []) as string[],
    loading: isLoading,
  };
}
