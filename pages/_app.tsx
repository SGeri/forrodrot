import "../public/global.css";

import Head from "next/head";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { Header } from "@components";

const queryClient = new QueryClient();

function Application({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
            <NotificationsProvider>
              <Head>
                <title>Forródrót</title>
                <meta
                  name="description"
                  content="Budapesti tüntetések a pedagógus tüntetésekkel és sztrájkkal kapcsolatban."
                />
                <link rel="icon" href="/fav_logo.ico" />
              </Head>

              <Header />

              <main>
                <Component {...pageProps} />
              </main>
            </NotificationsProvider>
          </MantineProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default Application;
