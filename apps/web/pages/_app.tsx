import Head from "next/head";
import { NextPropsWithLayout } from "types/page";
import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import { GlobalStyles } from "twin.macro";
import { DeviceProvider } from "lib/providers/DeviceProvider";
function MyApp({ Component, pageProps }: NextPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <CacheProvider value={cache}>
        <DeviceProvider>
          <GlobalStyles />
          {getLayout(<Component {...pageProps} />)}
        </DeviceProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
