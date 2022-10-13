import dynamic from "next/dynamic";
import { Loader } from "@mantine/core";

const Map = dynamic(() => import("./MapComponent"), {
  loading: () => <Loader />,
  ssr: false,
});

const Marker = dynamic(() => import("./Marker"), {
  loading: () => <Loader />,
  ssr: false,
});

export { Map, Marker };
