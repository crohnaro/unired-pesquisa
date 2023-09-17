import mongoose from "mongoose";

const schema = new mongoose.Schema({
  matricula: {
    type: String,
    required: [true, 'O campo "matrícula" é obrigatório.'],
  },
  cpf: {
    type: Number,
    required: [true, 'O campo "CPF" é obrigatório.'],
  },
  residecom: {
    type: String,
    required: [true, 'O campo "reside com:" é obrigatório.'],
  },
  estadocivil: {
    type: String,
    required: [true, 'O campo "estado civil" é obrigatório.'],
  },
  name: {
    type: String,
    required: [true, 'O campo "nome" é obrigatório.'],
  },
  email: {
    type: String,
    required: [true, 'O campo "e-mail" é obrigatório.'],
  },
  password: {
    type: String,
    required: [true, 'O campo "senha" é obrigatório.'],
  },
  idade: {
    type: Number,
    required: [true, 'O campo "idade" é obrigatório.'],
  },
  genero: {
    type: String,
    required: [true, 'O campo "gênero" é obrigatório.'],
  },
  course: {
    type: String,
    required: [true, 'O campo "curso" é obrigatório.'],
  }
});

export default mongoose.models.users || mongoose.model("users", schema);