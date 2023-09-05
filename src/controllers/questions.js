import QuestionModel from "../models/questions";
import dbConnect from "../utils/dbConnect";


const get = async (req, res) => {
  await dbConnect();
  const questions = await QuestionModel.find();
  res.status(200).json({ success: true, questions });
};

export { get };
