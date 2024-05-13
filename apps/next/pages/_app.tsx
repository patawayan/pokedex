import '@tamagui/core/reset.css';
import 'raf/polyfill';

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import { Provider } from 'app/provider';
import Head from 'next/head';
import React, { useEffect } from 'react';
import type { SolitoAppProps } from 'solito';
import useIsDesktop from 'app/hooks/useIsDesktop';
import { DesktopScreen } from 'app/features/desktop/screen';
import { LoadingScreen } from 'app/features/loading/screen';

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css');
}

const MyApp = ({ Component, pageProps }: SolitoAppProps) => {
  const isDesktop = useIsDesktop();

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Tamagui, Solito, Expo & Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider>
        {isDesktop === undefined ? (
          <LoadingScreen />
        ) : isDesktop ? (
          <DesktopScreen />
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </>
  );
};

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme();

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        setTheme(next as any);
      }}
    >
      <Provider disableRootThemeClass>{children}</Provider>
    </NextThemeProvider>
  );
}

export default MyApp;
