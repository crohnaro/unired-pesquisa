const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true,
    // O texto da pergunta
  },
});

export default mongoose.models.questions || mongoose.model("questions", schema);