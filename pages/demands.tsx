import { Box, createStyles, Title, Container, Text } from "@mantine/core";
import { PageHead } from "@components";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    textAlign: "center",
  },

  point: {
    marginTop: theme.spacing.xl,
  },

  background: {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    opacity: 0.05,
  },

  orgs: {
    marginTop: theme.spacing.xl,
    textAlign: "justify",
  },
}));

const Demands = () => {
  const { classes } = useStyles();

  return (
    <>
      <PageHead />

      <Box className={classes.background}>
        <Image
          width="750px"
          height="750px"
          src="/fav_logo.webp"
          alt="fejléc logo"
        />
      </Box>

      <Container className={classes.root} py="xl">
        <Box mb="md">
          <Title size={42}>Változást az oktatásban!</Title>
          <Text size={22}>Pedagógusok, diákok és szülők 9 pontja</Text>
        </Box>

        <Box mb="md">
          <Point
            title="1) NYILVÁNOS PÁRBESZÉDET, HITELES TÁJÉKOZTATÁST!"
            text="Érdemi és <strong>nyilvános párbeszédet</strong> az oktatás megújításáról! <strong>Hiteles tájékoztatást</strong> a kormány és a közmédia részéről!"
          />
          <Point
            title="2) MEGBECSÜLÉST A PEDAGÓGUSOKNAK!"
            text="Szüntessék meg a pedagógusok lejáratását, az oktatási szereplők megfélemlítését! A kirúgott vagy leváltott tanárokat azonnal helyezzék vissza! <strong>Megbecsülést a pedagógusoknak!</strong>"
          />
          <Point
            title="3) ÉRDEKÉRVÉNYESÍTŐ SZTRÁJKJOGOT!"
            text="<strong>Érdekérvényesítő sztrájkjogot</strong> a pedagógusoknak!"
          />
          <Point
            title="4) FELELŐS OKTATÁSTI MINISZTÉRIUMOT!"
            text="<strong>Felelős,</strong> hozzáértő oktatásirányítást! Önálló <strong>oktatási minisztériumot! </strong>"
          />
          <Point
            title="5) KISEBB TERHELÉST!"
            text="<strong>Kisebb terhelést</strong> a diákoknak és a pedagógusoknak!"
          />
          <Point
            title="6) ESÉLYTEREMTŐ, MINŐSÉGI OKTATÁST!"
            text="<strong>Esélyteremtő, minőségi</strong> oktatást és nevelést mindenkinek – az óvodától az egyetemig!"
          />
          <Point
            title="7) VERSENYKÉPES ÉS ÉRTÉKÁLLÓ BÉREZÉST!"
            text="<strong>Versenyképes és értékálló bérezést</strong> az oktatásban dolgozóknak!"
          />
          <Point
            title="8) 21. SZÁZADI KÖRNYEZETET!"
            text="Minőségi, <strong>21. századi környezetet</strong> a tanuláshoz és a tanításhoz, neveléshez!"
          />
          <Point
            title="9) SZAKMAI KORSZERŰ, SZABAD!"
            text="<strong>Szakmai</strong> szabadságot és támogatást az oktatásban! <strong>Korszerű</strong> nemzeti alaptantervet! <strong>Szabad</strong> tankönyvválasztást!"
          />
        </Box>

        <Box className={classes.orgs}>
          <Text size={12}>
            <strong>Támogató szervezetek: </strong>
            ADOM Diákmozgalom; aHang; Amnesty International Magyarország; Civil
            Bázis; Civil Kollégium Alapítvány; Civil Közoktatási Platform; Csak
            Együtt Van Esély csoport; Demokráciát! Jogállamot! Kormányváltást!
            Csoport; Egységes Diákfront; Hívatlanul Hálózat; Közösség a
            Pedagógusokért; Magyar Anyák; Magyarországi Roma Parlament; noÁr
            Mozgalom; Nyomtass te is! Mozgalom; Oktatói Hálózat; Pedagógus
            Egység; Pedagógusok Demokratikus Szakszervezete; Pedagógusok
            Szakszervezete; Szülői Hang Közösség; Szülői Összefogás Közösség;
            Tanítanék Mozgalom.
          </Text>
        </Box>
      </Container>
    </>
  );
};

function Point({ title, text }: { title: string; text: string }) {
  return (
    <Box mt="xl">
      <Title size={24}>{title}</Title>
      <Text size={16}>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </Text>
    </Box>
  );
}

export default Demands;
