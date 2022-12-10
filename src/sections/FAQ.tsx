import { Container, Title, Accordion, createStyles, Box } from "@mantine/core";

const questions = [
  [
    "Mi ez az oldal?",
    "A Forródrót csupán információgyűjtő és -megosztó oldal, az egyes kezdeményezések szervezői és résztvevői más-más problémákra hívják fel a figyelmet és várnak megoldást. Egy azonban biztos: a magyar közoktatás válságban van és sürgős változtatások nélkül összeomlik.",
  ],
  [
    "Mi az oldal célja?",
    "Összegyűjteni és egy helyen elérhetővé tenni az országszerte létrejövő, a közoktatás reformjára irányuló polgári kezdeményezésekkel kapcsolatos információkat.",
  ],
  [
    "Mi az oldalon megjelenő kezdeményezések célja?",
    `
    A Forródrót csupán információ-gyűjtő és megosztó oldal, az egyes kezdeményezések szervezői és résztvevői más-más problémákra hívják fel a figyelmet és várnak megoldást. Egy azonban biztos: a magyar közoktatás válságban van és sürgős változtatások nélkül összeomlik.
    <br /><br />
    <strong>Pedagógusok, diákok és szülők 9 pontja:</strong>
    <br /><br />
    1) Nyilvános párbeszédet, hiteles tájékoztatást!<br />
    2) Megbecsülést a pedagógusoknak!<br />
    3) Érdekérvényesítő sztrájkjogot!<br />
    4) Felelős oktatásti minisztériumot!<br />
    5) Kisebb terhelést!<br />
    6) Esélyteremtő, minőségi oktatást!<br />
    7) Versenyképes és értékálló bérezést!<br />
    8) 21. Századi környezetet!<br />
    9) Szakmai korszerű, szabad!`,
  ],
  [
    "Kik állnak a Forródrót mögött?",
    "Mérges, elkeseredett, aggódó diákok, akiknek elegük lett a magyar közoktatásban rájuk és tanáraikra nehezedő terhekből, megkötésekből és az intézményekben őket körülvevő állapotokból.",
  ],
  [
    "Ki finanszírozza a Forródrótot?",
    "A Forródrótot a készítő diákok nem megrendelésre, hanem belső késztetésből, egy jobb jövő reményében hozták létre és frissítik. Az ezzel járó költségeket maguk fedezik.",
  ],
  [
    // TODO when backlogging is implemented, change answer to this
    // Oszd meg velünk a fotóidat! Nem csak a közelgő, hanem a megtörtént eseményeket is össze akarjuk gyűjteni, hogy látható legyen, mennyi ember, mennyi helyen, mennyi ideje küzd az oktatás ügyéért.

    "Hogyan segíthetek?",
    "Oszd meg velünk az eseményeidet! Kis, diákokból álló csapat vagyunk, így rátok, a változásért küzdő bajtársainkra van szükségünk, hogy értesüljünk a kezdeményezésekről és másokkal is megoszthassuk őket.",
  ],
];

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.dark[9],
  },

  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },

  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,

    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function FAQ() {
  const { classes } = useStyles();
  return (
    <Box className={classes.root}>
      <Container size="sm" className={classes.wrapper}>
        <Title align="center" className={classes.title}>
          Gyakran Ismételt Kérdések
        </Title>

        <Accordion>
          {questions.map(([question, answer], index) => {
            return (
              <Accordion.Item
                key={index}
                value={index.toString()}
                className={classes.item}
              >
                <Accordion.Control>{question}</Accordion.Control>
                <Accordion.Panel>
                  <div dangerouslySetInnerHTML={{ __html: answer }}></div>{" "}
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Container>
    </Box>
  );
}
