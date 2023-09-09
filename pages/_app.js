import * as React from "react";
import { ToastyProvider } from "../src/contexts/Toasty";
import CssBaseline from "@mui/material/CssBaseline";

import { SessionProvider } from "next-auth/react";
import CheckAuth from "../src/components/CheckAuth";


import {
  useColorScheme as useMaterialColorScheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  THEME_ID,
} from "@mui/material/styles";

import {
  CssVarsProvider as JoyCssVarsProvider,
  useColorScheme as useJoyColorScheme,
} from "@mui/joy/styles";

import JoyTheme from '../src/theme/JoyTheme/theme'

const materialTheme = extendMaterialTheme();


export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider theme={JoyTheme}>
          <ToastyProvider>
            <CssBaseline />
            {Component.requireAuth ? (
              <CheckAuth Component={Component} pageProps={pageProps} />
            ) : (
              <Component {...pageProps} />
            )}
          </ToastyProvider>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </SessionProvider>
  );
}
