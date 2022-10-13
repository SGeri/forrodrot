import "../public/global.css";

import Head from "next/head";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { Header } from "@components";

function Application({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
        <NotificationsProvider>
          <Head>
            <title>Pedagógus Tüntetések</title>
            <meta
              name="description"
              content="Budapesti tüntetések a pedagógus tüntetésekkel és sztrájkkal kapcsolatban."
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Header />

          <main>
            <Component {...pageProps} />
          </main>
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default Application;
