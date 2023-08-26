import * as yup from "yup";

const initialValues = {
  email: "",
  password: "",
  genero: "",
  idade: "",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Campo obrigatório"),
  genero: yup
    .string()
    .required("Campo obrigatório"),
  idade: yup
    .number()
    .positive()
    .integer()
    .required("Campo obrigatório"),
});

export { initialValues, validationSchema };
