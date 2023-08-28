import * as React from "react";
import { ToastyProvider } from "../src/contexts/Toasty";
import CssBaseline from "@mui/material/CssBaseline";

import { SessionProvider } from "next-auth/react";
import CheckAuth from "../src/components/CheckAuth";


export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={pageProps.session}>
      <ToastyProvider>
        <CssBaseline />
        {Component.requireAuth ? (
          <CheckAuth Component={Component} pageProps={pageProps} />
        ) : (
          <Component {...pageProps} />
        )}
      </ToastyProvider>
    </SessionProvider>
  );
}
