import { useParticipants } from "@utils";
import { Participants } from "@sections";
import { PageHead } from "@components";

const ParticipantsPage = () => {
  const { total, list, loading } = useParticipants();

  return (
    <>
      <PageHead />

      <Participants total={total} list={list} loading={loading} />
    </>
  );
};

export default ParticipantsPage;
