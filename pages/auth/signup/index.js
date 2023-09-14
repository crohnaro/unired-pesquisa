import * as React from "react";

import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";

import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import Image from "next/image";
import logowh from "../../../public/logo white.png";

import { useRouter } from "next/router";

import axios from "axios";

import useToasty from "../../../src/contexts/Toasty";

import theme from "@/src/theme/JoyTheme/theme";




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
              justifyContent: "space-between",
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
              <Image
                alt="anunX Logo"
                width={120}
                priority
                src={logowh}
              />
            </Link>
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
                Crie uma conta
              </Typography>
              <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                Para realizar nossa pesquisa!
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
                <FormLabel>Matricula</FormLabel>
                <Input
                  type="matricula"
                  name="matricula"
                />
              </Stack>
              <Stack>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="name"
                  name="name"
                />
              </Stack>
              <Stack>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                />
              </Stack>

              <Stack>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  name="password"
                />
              </Stack>
              <Stack>
                <FormLabel>Confirmar Senha</FormLabel>
                <Input
                  type="password"
                  name="passwordConf"
                />
              </Stack>

              <Stack>
                <FormLabel>Idade</FormLabel>
                <Input
                  type="number"
                  name="idade"
                />
              </Stack>

              <Stack>
                <FormLabel>Genero</FormLabel>
                <Select
                  placeholder="Selecione um genero"
                  name="genero"
                  required
                >
                  <Option value="Masculino">Masculino</Option>
                  <Option value="Feminino">Feminino</Option>
                  <Option value="Não binário">Não binário</Option>
                  <Option value="Prefiro não declarar">Prefiro não declarar</Option>
                </Select>
              </Stack>

              <Stack>
                <FormLabel>Curso</FormLabel>
                <Select
                  placeholder="Selecione o curso"
                  name="course"
                  required
                >
                  <Option value="Sistemas de Informação">Sistemas de Informação</Option>
                  <Option value="Enfermagem">Enfermagem</Option>
                  <Option value="Direito">Direito</Option>
                  <Option value="Eng. Civil">Eng. Civil</Option>
                  <Option value="Eng. Elétrica">Eng. Elétrica</Option>
                  <Option value="Eng. Mecânica">Eng. Mecânica</Option>
                  <Option value="Fonoaudiologia">Fonoaudiologia</Option>
                  <Option value="Arquitetura e Urbanismo">Arquitetura e Urbanismo</Option>
                  <Option value="Fisioterapia">Fisioterapia</Option>
                  <Option value="Nutrição">Nutrição</Option>
                  <Option value="Psicologia">Psicologia</Option>
                  <Option value="Medicina">Medicina</Option>
                </Select>
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link fontSize="sm" href="/auth/signin" fontWeight="lg">
                  Ja tem Conta? Entre!
                </Link>
              </Box>

              <Button type="submit" fullWidth>
                Cadastrar
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
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(https://res.cloudinary.com/dljxq5wce/image/upload/v1692905708/imagemprincipal_bp3hfa.jpg)`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://res.cloudinary.com/dljxq5wce/image/upload/v1692905708/imagemprincipal_bp3hfa.jpg)",
          },
        })}
      />
    </CssVarsProvider>
  );
}
