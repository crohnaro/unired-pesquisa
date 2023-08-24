"use client"

import * as React from "react"
import { CssVarsProvider, useColorScheme} from "@mui/joy/styles"
import GlobalStyles from "@mui/joy/GlobalStyles"
import CssBaseline from "@mui/joy/CssBaseline"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import FormControl from "@mui/joy/FormControl"
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel"
import IconButton from "@mui/joy/IconButton"
import Link from "@mui/joy/Link"
import Input from "@mui/joy/Input"
import Typography from "@mui/joy/Typography"
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded"
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded"
import Image from "next/image";

import { extendTheme } from '@mui/joy/styles';

import logowh from '../../../public/logo white.png'
import logoblk from '../../../public/logo black.png'



const theme = extendTheme({
  "colorSchemes": {
    "light": {
      "palette": {
        "primary": {
          "50": "#f1fcfb",
          "100": "#cff8f4",
          "200": "#9ef1e8",
          "300": "#66e2da",
          "400": "#36cbc5",
          "500": "#1dafac",
          "600": "#169898",
          "700": "#156f70",
          "800": "#15595a",
          "900": "#062b2d"
        }
      }
    },
    "dark": {
      "palette": {
        "primary": {
          "50": "#f1fcfb",
          "100": "#cff8f4",
          "200": "#9ef1e8",
          "300": "#66e2da",
          "400": "#36cbc5",
          "500": "#1dafac",
          "600": "#169898",
          "700": "#156f70",
          "800": "#15595a",
          "900": "#062b2d"
        }
      }
    }
  }
})
  




function ColorSchemeToggle({ onClick, logoMode, setLogoMode, ...props }) {
  const { mode, setMode } = useColorScheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return <IconButton size="sm" variant="plain" color="neutral" disabled />
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...props}
      onClick={event => {
        if (mode === "light") {
          setMode("dark")
          setLogoMode("dark")
        } else {
          setMode("light")
          setLogoMode("light")
        }
        onClick?.(event)
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  )
}

/**
 * This template uses [`Inter`](https://fonts.google.com/specimen/Inter?query=inter) font.
 */
export default function JoySignInSideTemplate() {
    const [logoMode, setLogoMode] = React.useState("light")
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "40vw", // must be `vw` only
            "--Form-maxWidth": "700px",
            "--Transition-duration": "0.4s" // set to `none` to disable transition
          }
        }}
      />
      <Box
        sx={theme => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255 255 255 / 0.6)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)"
          }
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
            px: 2
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
                padding: "10px",
              }}
              href={"/"}
            >

                
                 <Image alt="anunX Logo" width={120} priority src={logoMode === "dark" ? logowh : logoblk} />
        
                
            </Link>
            <ColorSchemeToggle logoMode={logoMode} setLogoMode={setLogoMode} />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden"
              }
            }}
          >
            <div>
              <Typography component="h1" fontSize="xl2" fontWeight="lg">
                Entre com sua conta
              </Typography>
              <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                Faça a pesquisa!
              </Typography>
            </div>
            <form
              onSubmit={event => {
                event.preventDefault()
                const formElements = event.currentTarget.elements
                const data = {
                  email: formElements.email.value,
                  password: formElements.password.value,
                  persistent: formElements.persistent.checked
                }
                alert(JSON.stringify(data, null, 2))
              }}
            >
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" />
              </FormControl>
              <FormControl required>
                <FormLabel>Senha</FormLabel>
                <Input type="password" name="password" />
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg" textColor="#169898">
                  Esqueceu sua senha?
                </Link>
              </Box>
              <Button type="submit" fullWidth sx={{backgroundColor: "#169898"}}>
                Entrar
              </Button>
            </form>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © UniRedentor {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={theme => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left:
            "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            `url(https://res.cloudinary.com/dljxq5wce/image/upload/v1692905708/imagemprincipal_bp3hfa.jpg)`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://res.cloudinary.com/dljxq5wce/image/upload/v1692905708/imagemprincipal_bp3hfa.jpg)"
          }
        })}
        
      />
    </CssVarsProvider>
  )
}