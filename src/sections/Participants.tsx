import Link from "next/link";
import CountUp from "react-countup";
import {
  Title,
  Text,
  Box,
  createStyles,
  SimpleGrid,
  Loader,
  Center,
  Button,
} from "@mantine/core";
import { ParticipantsTotal } from "@types";

interface ParticipantsProps {
  total: ParticipantsTotal;
  list: string[];
  loading: boolean;
}

const useStyles = createStyles((theme) => ({
  root: {
    [theme.fn.largerThan("xs")]: {
      paddingLeft: 120,
      paddingRight: 120,
    },

    padding: theme.spacing.xl * 2,
  },

  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function Participants({
  total,
  list,
  loading,
}: ParticipantsProps) {
  const { classes } = useStyles();

  const schools = list.map((school: string, index: number) => (
    <Title key={index} size={20} mb="xs">
      {school}
    </Title>
  ));

  return (
    <Box className={classes.root}>
      {loading && (
        <Center>
          <Loader size="lg" />
        </Center>
      )}

      <Title align="center" mb="xl">
        Munkabeszüntetés
      </Title>

      {schools.length <= 0 && (
        <Text weight="bold" align="center">
          Jelenleg egyetlen iskola sem vesz részt!
        </Text>
      )}

      <Box sx={{ maxWidth: "450px", margin: "auto" }}>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <CounterBox label="Iskola" value={total.schools} duration={2} />
          <CounterBox
            label="Részt vevő tanár"
            value={total.participants}
            duration={3}
          />
        </SimpleGrid>
      </Box>

      <Center pt="md">
        <Link href="/participants#map" scroll={false}>
          <Button size="md">Iskolák térképe</Button>
        </Link>
      </Center>

      <Title align="center" mt={50}>
        Csatlakozó iskolák
      </Title>

      <Box sx={{ textAlign: "center" }} mt="xl">
        {schools}
      </Box>
    </Box>
  );
}

interface CounterBoxProps {
  label: string;
  value: number;
  duration: number;
}

function CounterBox({ label, value, duration }: CounterBoxProps) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Title size={48}>
        <CountUp start={0} end={value} duration={duration} />
      </Title>
      <Text size={22}>{label}</Text>
    </Box>
  );
}
