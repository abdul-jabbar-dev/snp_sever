import bcrypt from "bcrypt";
import { config } from "dotenv";
import {
  findRequestedUser,
  findUserByEmailOrName,
  findUserByUserName,
  registerUser,
  updateUser,
} from "../../services/auth/auth.service.js";

config();

export const registerHandler = async (req, res, next) => {
  const { email, password, user_name } = req.body;
  if (!email || !password || !user_name)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const existingUserName = await findUserByUserName(user_name);
  if (existingUserName) {
    return res.status(409).json({ message: "User Name Already Exists!!!" });
  }

  const existingUser = await findUserByEmailOrName(email, "");
  if (existingUser) {
    return res.status(409).json({ message: "Email Already Exists!!!" });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUserData = {
      ...req.body,
      password: hashPassword,
    };
    await registerUser(newUserData);
    res.status(201).json({ success: `New user created!!!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
