import * as React from "react";
import { ToastyProvider } from "../src/contexts/Toasty";
import CssBaseline from "@mui/material/CssBaseline";

import { SessionProvider } from "next-auth/react";
import CheckAuth from "../src/components/CheckAuth";
import theme from "@/src/theme/theme";
import { ThemeProvider } from "@mui/joy";


export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={pageProps.session}>
      <ToastyProvider>
        <CssBaseline />
        {Component.requireAuth ? (
          <CheckAuth  Component={Component} pageProps={pageProps} />
        ) : (
          <Component {...pageProps} />
        )}
      </ToastyProvider>
    </SessionProvider>
    </ThemeProvider>
    
  );
}
