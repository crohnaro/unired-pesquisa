import * as yup from "yup";

const initialValues = {
  matricula: "",
  name: "",
  email: "",
  password: "",
  passwordConf: "",
  idade: "",
  genero: "",
  course: "",
};

const validationSchema = yup.object().shape({
  matricula: yup.string().required("Campo obrigatório"),
  name: yup.string().required("Campo obrigatório"),  
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Campo obrigatório"),
  passwordConf: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas precisam ser iguais")
    .required("Campo obrigatório"),
  idade: yup.number().positive().integer().required("Campo obrigatório"),
  genero: yup.string().required("Campo obrigatório"),
  course: yup.string().required("Campo obrigatório"),
});

export { initialValues, validationSchema };
