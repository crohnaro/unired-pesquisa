const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  resposta1: {
    type: String,
    required: true,
  },
  resposta2: {
    type: String,
    required: true,
  },
  resposta3: {
    type: String,
    required: true,
  },
  resposta4: {
    type: String,
    required: true,
  },
  resposta5: {
    type: String,
    required: true,
  },
  resposta6: {
    type: String,
    required: true,
  },
  resposta7: {
    type: String,
    required: true,
  },
  resposta8: {
    type: String,
    required: true,
  },
  resposta9: {
    type: String,
    required: true,
  },
  resposta10: {
    type: String,
    required: true,
  },
  resposta11: {
    type: String,
    required: true,
  },
  resposta12: {
    type: String,
    required: true,
  },
  resposta13: {
    type: String,
    required: true,
  },
  resposta14: {
    type: String,
    required: true,
  },
  resposta15: {
    type: String,
    required: true,
  },
  resposta16: {
    type: String,
    required: true,
  },
  resposta17: {
    type: String,
    required: true,
  },
  resposta18: {
    type: String,
    required: true,
  },
  resposta19: {
    type: String,
    required: true,
  },
  resposta20: {
    type: String,
    required: true,
  },
  resposta21: {
    type: String,
    required: true,
  },
  resposta22: {
    type: String,
    required: true,
  },
  resposta23: {
    type: String,
    required: true,
  },
  resposta24: {
    type: String,
    required: true,
  },
  resposta25: {
    type: String,
    required: true,
  },
  resposta26: {
    type: String,
    required: true,
  },
  user: {
    id: String,
    name: String,
    email: String,
    idade: Number,
    genero: String,
    course: String,
    matricula: String,
  },
});

export default mongoose.models.answers || mongoose.model("answers", schema);
