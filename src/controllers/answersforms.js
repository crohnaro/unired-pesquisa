import AnswersModel from '../models/answersForms'
import dbConnect from "../utils/dbConnect";

import formidable from "formidable-serverless";

const post = async (req, res) => {

  await dbConnect();

  const form = new formidable.IncomingForm({
    multiples: true,
    keepExtensions: true,
  });
  
  form.parse(req, async (error, fields ) => {
    if (error) {
      return res.status(500).json({ success: false });
    }

    const {
      resposta1,
      resposta2,
      resposta3,
      resposta4,
      resposta5,
      /*resposta6,
      resposta7,
      resposta8,
      resposta9,
      resposta10,
      resposta11,
      resposta12,
      resposta13,
      resposta14,
      resposta15,
      resposta16,
      resposta17,
      resposta18,
      resposta19,
      resposta20,
      resposta21,
      resposta22,
      resposta23,
      resposta24,
      resposta25,
      resposta26,*/
      matricula,
      name,
      email,
      idade,
      genero,
      course

    } = fields;

    const answer = new AnswersModel({
      resposta1,
      resposta2,
      resposta3,
      resposta4,
      resposta5,
      /*resposta6,
      resposta7,
      resposta8,
      resposta9,
      resposta10,
      resposta11,
      resposta12,
      resposta13,
      resposta14,
      resposta15,
      resposta16,
      resposta17,
      resposta18,
      resposta19,
      resposta20,
      resposta21,
      resposta22,
      resposta23,
      resposta24,
      resposta25,
      resposta26,*/
      userEmail,
      user: {
        matricula,
        id: userEmail,
        name,
        email,
        idade, 
        genero, 
        course,
      },
    });

    const register = await answer.save();

    if (register) {
      res.status(201).json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  });
};

export { post };
