import { UseerModel } from "../Models/UserModel.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !password || !email) {
      return res.status(400).send({
        message: "Please fill all feilds",
      });
    }
    const existingUser = await UseerModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        message: "user already register",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UseerModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      message: "new user created",
      user,
    });
  } catch (error) {
    return res.status(500).send({ message: "Error" });
  }
};
export const userController = async (req, res) => {
  try {
    const users = await UseerModel.find({});
    return res.status(200).send({
      userCount: users.length,
      message: "new user created",
      users,
    });
  } catch (error) {
    return res.status(500).send({ message: "Error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        message: "please provide the email and password",
      });
    }
    const user = await UseerModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        message: "email is not registered",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: "invalid email or password", 
      });
    }

    return res.status(200).send({
      messgae: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error" });
  }
};
