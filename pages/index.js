import * as React from "react";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import { useRouter } from "next/router";

import axios from "axios";

import useToasty from "../src/contexts/Toasty";

import theme from "@/src/theme/JoyTheme/theme";


import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Select,
  Typography,
  Input,
  MenuItem,
  CircularProgress,
  FormLabel,
  CssBaseline,
} from "@mui/material";

import { getSession } from "next-auth/react";
import dbConnect from "../src/utils/dbConnect";
import UsersModel from "../src/models/users";

import TemplateDefault from "../src/template/Default";
import { Formik } from "formik";
import { initialValues, validationSchema } from "@/src/lib/formValueAnswersForms";



const Home = ({ userEmail }) => {
  const router = useRouter();
  const { setToasty } = useToasty();


  const handleFormSubmit = async (formJson) => {
    const response = await axios.post("/api/answersforms", formJson);

    console.log(user);

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

  const formValues = {
    ...initialValues,
  };
  formValues.userEmail = userEmail;

  return (
    <TemplateDefault>
      <CssBaseline />
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
            <Formik
              initialValues={formValues}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({
                touched,
                values,
                errors,
                handleChange,
                handleSubmit,
                setFieldValue,
                isSubmitting,
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Input
                      type="hidden"
                      name="userEmail"
                      value={values.userEmail}
                    />
                    <Input type="hidden" name="image" value={values.image} />

                    <Container
                      maxWidth="md"
                      style={{ marginBottom: theme.spacing(3) }}
                    >
                      <Box
                        style={{
                          padding: theme.spacing(3),
                        }}
                      >
                        <FormControl
                          error={errors.resposta1 && touched.resposta1}
                          fullWidth
                        >
                          <FormLabel>Em geral, sinto-me motivado com meu curso:</FormLabel>
                          <Select
                            name="resposta1"
                            value={values.resposta1}
                            onChange={handleChange}
                            label="Selecione uma opção"
                            fullWidth
                          >
                            <MenuItem value={"1 - NUNCA ou RARAMENTE"}>
                              1 - NUNCA ou RARAMENTE
                            </MenuItem>
                            <MenuItem value={"2 - FREQUENTEMENTE"}>
                              2 - FREQUENTEMENTE
                            </MenuItem>
                            <MenuItem value={"3 - SEMPRE"}>3 - SEMPRE</MenuItem>
                          </Select>
                          <FormHelperText>
                            {errors.resposta1 && touched.resposta1
                              ? errors.resposta1
                              : null}
                          </FormHelperText>
                        </FormControl>
                      </Box>
                    </Container>

                    <Container
                      maxWidth="md"
                      style={{ marginBottom: theme.spacing(3) }}
                    >
                      <Box textAlign="right">
                        {isSubmitting ? (
                          <CircularProgress
                            sx={{ display: "block", margin: "10px auto" }}
                          />
                        ) : (
                          <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Enviar Respostas!
                          </Button>
                        )}
                      </Box>
                    </Container>
                  </form>
                );
              }}
            </Formik>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © UniRedentor {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </TemplateDefault>
  );
};

Home.requireAuth = true;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  await dbConnect();

  let token = session?.accessToken || session?.user?.email || "";

  const user = await UsersModel.find({
    "user.email": session.user.email,
  });

  console.log(session);
  console.log(token);

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default Home;
