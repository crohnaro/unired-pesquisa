import * as React from "react";

import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

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
    const response = await axios.post("", formJson);

    console.log(formJson);
    if (response.data.success) {
      setToasty({
        open: true,
        seveity: "success",
        text: "Cadastro realizado com sucesso!",
      });

      router.push("/auth/signin");
    }
  };

  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get("/api/questions"); // Substitua pela rota real
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
      }
    }

    fetchQuestions();
  }, []);
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
              width: 600,
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
                Prezado(a) Estudante
              </Typography>
              <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                É com grande interesse que convidamos você a participar de um
                momento fundamental para a pesquisa que está sendo conduzida no
                âmbito da UniRedentor. Esta pesquisa tem como objetivo
                aprofundar nossa compreensão sobre as percepções e sentimentos
                dos estudantes em relação à sua experiência acadêmica,
                especificamente no que diz respeito à graduação que estão
                cursando.
              </Typography>
              <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                Sabemos que a vida acadêmica é repleta de desafios e
                realizações, e a sua perspectiva é inestimável para enriquecer
                nosso entendimento sobre os diversos aspectos envolvidos. Sua
                participação ao responder o questionário contribuirá
                significativamente para o avanço do conhecimento na área de
                Ensino das Ciências e Saúde, possibilitando a criação de
                estratégias mais eficazes para melhorar a qualidade da educação
                e o bem-estar dos estudantes.
              </Typography>
              <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                Este SCORE busca capturar seus sentimentos e percepções genuínos
                em relação à sua graduação. Queremos que você se sinta à vontade
                para expressar seus pensamentos de maneira verdadeira e
                autêntica. Suas respostas serão tratadas com total
                confidencialidade e serão utilizadas apenas para fins de análise
                estatística e pesquisa acadêmica.
              </Typography>
              <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                Pedimos que avalie cada sentimento que você tem em relação à sua
                graduação, atribuindo um número de 1 a 3, de acordo com a
                frequência com que esses sentimentos emergem em seus
                pensamentos. Utilize a seguinte escala:
              </Typography>
              <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                1 - NUNCA ou RARAMENTE 2 - FREQUENTEMENTE 3 - SEMPRE
              </Typography>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());

                handleFormSubmit(formJson);
              }}
            >
              {questions.map((question) => (
                <Stack marginBottom={2} gap={1} key={question._id}>
                  <FormLabel>{question.text}</FormLabel>
                  <Select
                    placeholder="Selecione uma opção"
                    name="questions"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">1 - NUNCA ou RARAMENTE  </Option>
                    <Option value="2 - FREQUENTEMENTE">2 - FREQUENTEMENTE</Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>
              ))}

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
