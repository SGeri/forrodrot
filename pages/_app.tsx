import Head from "next/head";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { MantineProvider, AppShell } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Image from "next/image";

import { Header, Footer } from "@components";

function Application({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        theme={{ colorScheme: "dark" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <Head>
            <title>Pedagógus Tüntetések</title>
            <meta
              name="description"
              content="Budapesti tüntetések a pedagógus tüntetésekkel és sztrájkkal kapcsolatban."
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Header
            links={[
              { label: "Features", link: "/features" },
              {
                label: "Learn",
                link: "/learn",
                links: [
                  { label: "Documentation", link: "/learn/docs" },
                  { label: "Documentation", link: "/learn/docs" },
                ],
              },
              { label: "About", link: "/features" },
              { label: "Pricing", link: "/features" },
              {
                label: "Support",
                link: "/learn",
                links: [
                  { label: "FAQ", link: "/learn/docs" },
                  { label: "Forums", link: "/learn/docs" },
                ],
              },
            ]}
          />

          <main>
            <Component {...pageProps} />
          </main>

          <footer>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{" "}
              <span>
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={72}
                  height={16}
                />
              </span>
            </a>
          </footer>
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default Application;
