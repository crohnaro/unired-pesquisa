import UsersModel from "../models/users";
import dbConnect from "../utils/dbConnect";
import { crypto } from "../utils/password";

const get = async (req, res) => {
  await dbConnect();
  const users = await UsersModel.find();
  res.status(200).json({ success: true, users });
};

const post = async (req, res) => {
  const { matricula, name, email, password, idade, genero, course, estadocivil, residecom, cpf } = req.body;

  await dbConnect();
  const passwordCrypto = await crypto(password);
  const user = new UsersModel({
    matricula,
    name,
    email,
    idade,
    genero,
    course, 
    estadocivil,
    residecom,
    cpf,
    password: passwordCrypto,
  });

  user.save();
  res.status(201).json({ success: true });
};

export { get, post };
