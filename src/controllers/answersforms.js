import AnswersModel from '../models/answers'
import dbConnect from "../utils/dbConnect";

import formidable from "formidable-serverless";

const post = async (req, res) => {

  await dbConnect();

  const form = new formidable.IncomingForm({
    multiples: true,
    keepExtensions: true,
  });
  
  form.parse(req, async (error, fields, data) => {
    if (error) {
      return res.status(500).json({ success: false });
    }

    const {
      question,
      text,
      matricula,
      name,
      email,
      idade,
      genero,
      course

    } = fields;

    const answer = new AnswersModel({
      question,
      text,
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
