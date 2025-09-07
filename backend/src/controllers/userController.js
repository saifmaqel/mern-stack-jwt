import User from "../models/userModel.js";
import { validateFields } from "../utils/utils.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const errorMessage = validateFields(req.body);
    if (errorMessage) {
      throw Error(errorMessage);
      // return res.status(400).json({ error: errorMessage });
    }
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ message: "login user", email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// signup user
export async function signupUser(req, res) {
  try {
    const { email, password } = req.body;
    const errorMessage = validateFields(req.body);
    if (errorMessage) {
      throw Error(errorMessage);
      // return res.status(400).json({ error: errorMessage });
    }
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ message: "signup user", email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
