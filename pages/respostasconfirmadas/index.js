import * as React from "react";

import Lottie from "lottie-react";
import animationData from '@/public/animation_lmjed7ky.json'

import { getSession } from "next-auth/react";
import dbConnect from "../../src/utils/dbConnect";
import UsersModel from "../../src/models/users";

import TemplateDefault from "../../src/template/Default";
import { Box, CssBaseline, GlobalStyles } from "@mui/joy";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import Typography from "@mui/joy/Typography";

import theme from "@/src/theme/JoyTheme/theme";

function ColorSchemeToggle({ onClick, logoMode, setLogoMode, ...props }) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="plain" color="neutral" disabled />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...props}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
          setLogoMode("dark");
        } else {
          setMode("light");
          setLogoMode("light");
        }
        onClick?.(event);
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}


const RespostasConfirmadas = () => {
  const [logoMode, setLogoMode] = React.useState("light");

  return (
    <TemplateDefault>
      <CssVarsProvider
        defaultMode="dark"
        disableTransitionOnChange
        theme={theme}
      >
        <CssBaseline />
        <GlobalStyles
          styles={{
            ":root": {
              "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
              "--Cover-width": "40vw", // must be `vw` only
              "--Form-maxWidth": "700px",
              "--Transition-duration": "0.4s", // set to `none` to disable transition
            },
          }}
        />
        <Box
          sx={(theme) => ({
            width: "100%",
            transition: "width var(--Transition-duration)",
            transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(255 255 255 / 0.6)",
            [theme.getColorSchemeSelector("dark")]: {
              backgroundColor: "rgba(19 19 24 / 0.4)",
            },
          })}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100dvh",
              width:
                "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
              maxWidth: "100%",
              px: 2,
            }}
          >
            <Box
              component="header"
              sx={{
                py: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <ColorSchemeToggle
                logoMode={logoMode}
                setLogoMode={setLogoMode}
              />
            </Box>
            <Box
              component="main"
              sx={{
                my: "auto",
                py: 2,
                pb: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                width: 700,
                maxWidth: "100%",
                mx: "auto",
                borderRadius: "sm",
                "& form": {
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                },
                [`& .${formLabelClasses.asterisk}`]: {
                  visibility: "hidden",
                },
              }}
            >
              <Box sx={{ width: "200px"}}>
              <Lottie 
                animationData={animationData}
                loop={false}
              />
              </Box>
              <Box>
                <Typography>Obrigado por responder nossa pesquisa!</Typography>
              </Box>
              
              
            </Box>
            <Box component="footer" sx={{ py: 3 }}>
              <Typography level="body-xs" textAlign="center">
                © UniRedentor {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CssVarsProvider>
    </TemplateDefault>
  );
};

RespostasConfirmadas.requireAuth = true;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  await dbConnect();

  let token = session?.accessToken || session?.user?.email || "";

  const user = await UsersModel.find({
    email: session?.user?.email,
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      userEmail: token,
    },
  };
}

export default RespostasConfirmadas;
