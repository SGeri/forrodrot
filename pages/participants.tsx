import { useParticipants } from "@utils";
import { Participants, ParticipantsMap } from "@sections";
import { PageHead } from "@components";

const ParticipantsPage = () => {
  const { total, list, loading } = useParticipants();
  const schools = list.map(({ school }) => school);

  const markers = list.map(({ school, coordinates }) => {
    const [x, y] = coordinates
      .replace(" ", "")
      .split(",")
      .map((c) => parseFloat(c));

    return { name: school, x, y };
  });

  return (
    <>
      <PageHead />

      <Participants total={total} list={schools} loading={loading} />

      <ParticipantsMap markers={markers} />
    </>
  );
};

export default ParticipantsPage;
