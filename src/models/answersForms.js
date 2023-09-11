const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  resposta1: String,
  resposta2: String,
  resposta3: String,
  resposta4: String,
  resposta5: String,
  resposta6: String,
  resposta7: String,
  resposta8: String,
  resposta9: String,
  resposta10: String,
  resposta11: String,
  resposta12: String,
  resposta13: String,
  resposta14: String,
  resposta15: String,
  resposta16: String,
  resposta17: String,
  resposta18: String,
  resposta19: String,
  resposta20: String,
  resposta21: String,
  resposta22: String,
  resposta23: String,
  resposta24: String,
  resposta25: String,
  resposta26: String,
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