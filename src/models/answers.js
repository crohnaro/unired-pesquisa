const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'questions',
    required: true,
    // Referência à pergunta à qual esta resposta está associada
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
  text: {
    type: String,
    required: true,
    // O texto da resposta dada pelo usuário
  },
  // Outros campos relevantes, como data e hora da resposta, etc.
});

export default mongoose.models.answers || mongoose.model("answers", schema);