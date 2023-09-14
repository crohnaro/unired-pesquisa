import * as React from "react";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import { useRouter } from "next/router";

import axios from "axios";

import useToasty from "../src/contexts/Toasty";

import theme from "@/src/theme/JoyTheme/theme";

import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import { getSession } from "next-auth/react";
import dbConnect from "../src/utils/dbConnect";
import UsersModel from "../src/models/users";

import TemplateDefault from "../src/template/Default";

const Home = ({ user, userEmail }) => {
  const router = useRouter();
  const { setToasty } = useToasty();

  const handleFormSubmit = async (formJson) => {
    const response = await axios.post("/api/answersforms", formJson);

    if (response.data.success) {
      setToasty({
        open: true,
        severity: "success",
        text: "Cadastro realizado com sucesso!",
      });

      router.push("/respostasconfirmadas");
    }
  };

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
              <div>
                <Typography component="h1" fontSize="xl2" fontWeight="lg">
                  Prezado(a) Estudante
                </Typography>
                <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                  É com grande interesse que convidamos você a participar de um
                  momento fundamental para a pesquisa que está sendo conduzida
                  no âmbito da UniRedentor. Esta pesquisa tem como objetivo
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
                  estratégias mais eficazes para melhorar a qualidade da
                  educação e o bem-estar dos estudantes.
                </Typography>
                <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                  Este SCORE busca capturar seus sentimentos e percepções
                  genuínos em relação à sua graduação. Queremos que você se
                  sinta à vontade para expressar seus pensamentos de maneira
                  verdadeira e autêntica. Suas respostas serão tratadas com
                  total confidencialidade e serão utilizadas apenas para fins de
                  análise estatística e pesquisa acadêmica.
                </Typography>
                <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
                  Pedimos que avalie cada sentimento que você tem em relação à
                  sua graduação, atribuindo um número de 1 a 3, de acordo com a
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
                <Stack sx={{ display: "none" }}>
                  <Input name="matricula" value={user[0].matricula} />
                  <Input name="name" value={user[0].name} />
                  <Input name="idade" value={user[0].idade} />
                  <Input name="genero" value={user[0].genero} />
                  <Input name="course" value={user[0].course} />
                  <Input name="email" value={user[0].email} />
                  <Input name="userEmail" value={userEmail} />
                </Stack>
                <Stack>
                  <FormLabel>
                    1 - Em geral, sinto-me motivado com meu curso:
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta1"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    2 - Sinto que faço parte de uma comunidade acadêmica unida e
                    colaborativa.
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta2"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    3 - Tenho uma clara compreensão dos objetivos e benefícios
                    da minha graduação.
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta3"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>
                <Stack>
                  <FormLabel>
                    4 - Sinto que tenho apoio necessário para superar meus
                    desafios acadêmicos:
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta4"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    5 - Sinto que minhas necessidades e opiniões são valorizadas
                    pela instituição
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta5"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>
                <Stack>
                  <FormLabel>
                    6 - Sinto um senso de pertencimento à minha faculdade.
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta6"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>7 - Apresento dificuldades financeiras:</FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta7"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    8 - Tenho dificuldade em conciliar trabalho e estudos:
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta8"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    9 - Tenho dificuldade em conciliar casa/ família e estudos
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta9"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    10 - Me irrito com a distância da instituição de ensino X
                    minha casa:
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta10"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    11 - Sinto que meu curso não é condizente com meu perfil.
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta11"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    12 - O clima com os colegas de sala não contribuem para que
                    eu me sinta a vontade.
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta12"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    13 - Sinto que o corpo docente ou parte dele, não tem a
                    experiência e o conhecimento mínimos para uma boa formação.
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta13"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    14 - Percebo que o corpo docente ou parte dele, não se
                    importa com as relações entre docentes e alunos.
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta14"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    15 - Sinto falta de apoio da coordenação de curso.
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta15"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    16 - Sinto falta de infra infraestrutura da IES.
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta16"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>17 - Sinto falta de apoio pedagógico.</FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta17"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>18 - Sinto falta de apoio psicológico.</FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta18"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>19 - Percebo excesso de atividades.</FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta19"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>20 - Tenho dificuldade em fazer provas.</FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta20"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    21 - Tenho dificuldade para chegar no horário ou ter de sair
                    mais cedo.
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta21"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    22 - Avalie cada sentimento que você tem em relação à sua
                    graduação: MEDO{" "}
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta22"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    23 - Avalie cada sentimento que você tem em relação à sua
                    graduação: INSEGURANÇA{" "}
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta23"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    24 - Avalie cada sentimento que você tem em relação à sua
                    graduação: ANGÚSTIA{" "}
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta24"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    25 - Avalie cada sentimento que você tem em relação à sua
                    graduação: DESESPERO{" "}
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta25"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Stack>
                  <FormLabel>
                    26 - Avalie cada sentimento que você tem em relação à sua
                    graduação: ANSIEDADE{" "}
                  </FormLabel>
                  <Select
                    placeholder="Selecione uma resposta"
                    name="resposta26"
                    required
                  >
                    <Option value="1 - NUNCA ou RARAMENTE">
                      1 - NUNCA ou RARAMENTE
                    </Option>
                    <Option value="2 - FREQUENTEMENTE">
                      2 - FREQUENTEMENTE
                    </Option>
                    <Option value="3 - SEMPRE">3 - SEMPRE</Option>
                  </Select>
                </Stack>

                <Button type="submit" fullWidth>
                  Enviar Respostas
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
    </TemplateDefault>
  );
};

Home.requireAuth = true;

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

export default Home;
