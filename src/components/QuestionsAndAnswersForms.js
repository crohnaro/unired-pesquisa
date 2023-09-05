import * as React from "react";

import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import Image from "next/image";

import logowh from "../../public/logo white.png";
import logoblk from "../../public/logo black.png";


import { useRouter } from "next/router";

import axios from "axios";

import useToasty from "../../src/contexts/Toasty";

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

export default function Signup() {
  const router = useRouter();
  const { setToasty } = useToasty();

  const handleFormSubmit = async (formJson) => {
    const response = await axios.post("/api/users", formJson);

    console.log(formJson)
    if (response.data.success) {
      setToasty({
        open: true,
        seveity: "success",
        text: "Cadastro realizado com sucesso!",
      });

      router.push("/auth/signin");
    }
  };
  const [logoMode, setLogoMode] = React.useState("light");
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange theme={theme}>
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
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <div>
              <Typography component="h1" fontSize="xl2" fontWeight="lg">
                Responda nossa pesquisa!
              </Typography>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                
                handleFormSubmit(formJson)
              }}
            >
               <Stack>
                <FormLabel>Pergunta 1</FormLabel>
                <Select
                  placeholder="Selecione a resposta"
                  name="genero"
                  required
                >
                  <Option value="Opção 1">Opção 1</Option>
                  <Option value="Opção 2">Opção 2</Option>
                  <Option value="Opção 3">Opção 3</Option>
                </Select>
              </Stack>

              <Stack>
                <FormLabel>Pergunta 2</FormLabel>
                <Select
                  placeholder="Selecione a resposta"
                  name="genero"
                  required
                >
                  <Option value="Opção 1">Opção 1</Option>
                  <Option value="Opção 2">Opção 2</Option>
                  <Option value="Opção 3">Opção 3</Option>
                </Select>
              </Stack>

              <Stack>
                <FormLabel>Pergunta 3</FormLabel>
                <Select
                  placeholder="Selecione a resposta"
                  name="genero"
                  required
                >
                  <Option value="Opção 1">Opção 1</Option>
                  <Option value="Opção 2">Opção 2</Option>
                  <Option value="Opção 3">Opção 3</Option>
                </Select>
              </Stack>

              <Stack>
                <FormLabel>Pergunta 4</FormLabel>
                <Select
                  placeholder="Selecione a resposta"
                  name="genero"
                  required
                >
                  <Option value="Opção 1">Opção 1</Option>
                  <Option value="Opção 2">Opção 2</Option>
                  <Option value="Opção 3">Opção 3</Option>
                </Select>
              </Stack>

              <Stack>
                <FormLabel>Pergunta 5</FormLabel>
                <Select
                  placeholder="Selecione a resposta"
                  name="genero"
                  required
                >
                  <Option value="Opção 1">Opção 1</Option>
                  <Option value="Opção 2">Opção 2</Option>
                  <Option value="Opção 3">Opção 3</Option>
                </Select>
              </Stack>

              <Stack>
                <FormLabel>Pergunta 6</FormLabel>
                <Select
                  placeholder="Selecione a resposta"
                  name="genero"
                  required
                >
                  <Option value="Opção 1">Opção 1</Option>
                  <Option value="Opção 2">Opção 2</Option>
                  <Option value="Opção 3">Opção 3</Option>
                </Select>
              </Stack>

              <Stack>
                <FormLabel>Pergunta 7</FormLabel>
                <Select
                  placeholder="Selecione a resposta"
                  name="genero"
                  required
                >
                  <Option value="Opção 1">Opção 1</Option>
                  <Option value="Opção 2">Opção 2</Option>
                  <Option value="Opção 3">Opção 3</Option>
                </Select>
              </Stack>

              <Stack>
                <FormLabel>Pergunta 8</FormLabel>
                <Select
                  placeholder="Selecione a resposta"
                  name="genero"
                  required
                >
                  <Option value="Opção 1">Opção 1</Option>
                  <Option value="Opção 2">Opção 2</Option>
                  <Option value="Opção 3">Opção 3</Option>
                </Select>
              </Stack>
              <Button type="submit" fullWidth>
                Enviar Respostas!
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
    </CssVarsProvider>
  );
}
