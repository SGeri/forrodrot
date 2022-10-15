import Head from "next/head";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Header } from "@components";

import "../public/global.css";

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

                <meta property="og:title" content="Forródrót" />
                <meta property="og:site_name" content="Forródrót" />
                <meta property="og:url" content="forrodrot.com" />
                <meta
                  property="og:description"
                  content="A Forródrót a közoktatással kapcsolatos polgári kezdeményezések gyűjtőhelye."
                />
                <meta property="og:type" content="website" />
                <meta
                  property="og:image"
                  content="https://i.imgur.com/iaj8OnB.png"
                />
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
