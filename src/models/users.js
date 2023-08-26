import mongoose from "mongoose";

const schema = new mongoose.Schema({
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
  
});

export default mongoose.models.users || mongoose.model("users", schema);