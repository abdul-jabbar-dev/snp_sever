import {
  findRequestedUser,
  findUserByEmailOrName,
  findUserByUserName,
  updateUser,
} from "../../services/auth/auth.service.js";
import nodemailer from "nodemailer";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Mailgen from "mailgen";

config();

const convertProperties = (inputArray) => {
  const convertedObject = {};
  inputArray.forEach((item) => {
    const attributeName = item.UserName;
    convertedObject[attributeName] = item;
  });
  return convertedObject;
};

export const requestedUserHandler = async (req, res, next) => {
  const limit = Number(req.query?.limit) || 5;
  const page = Number(req.query?.page) || 0;
  const filter = req.query?.filter;
  const skip = limit * page;
  try {
    const response = await findRequestedUser({ limit, skip, filter });
   
      const convertData = convertProperties(response?.data)||[];
   
    res.status(200).json({ data: convertData, count: response.count||0 });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding requested user", error: error.message });
  }
};

export const requestedMyInfo = async (req, res, next) => {
  try {
    const response = await findUserByUserName(req.user);

    if (response) {
      delete response["EncryptedPassword"];
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Request failed try again to login!!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding requested user", error: error.message });
  }
};

export const updateUserHandler = async (req, res, next) => {
  try {
    await updateUser(req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error in updating user");
  }
};

export const resetPasswordHandler = async (req, res) => {
  const { username, token } = req.params;
  const { password } = req.body;

  const oldUser = await findUserByUserName(username);
  if (!oldUser) {
    return res.status(401).json({ error: "User Not Exists!!" });
  }
  //const secret = process.env.JWT_SECRET + oldUser.EncryptedPassword;
  const secret = process.env.JWT_SECRET;
  try {
    const decodedToken = jwt.verify(token, secret);
    const { email, id } = decodedToken;

    if (email !== oldUser.EmailAddress || id !== oldUser.UserName) {
      return res.status(401).json({ error: "Invalid token" });
    }
    //const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);

    await updateUser({
      UserName: username,
      EmailAddress: oldUser.EmailAddress,
      ColumnName: "EncryptedPassword",
      ColumnValue: encryptedPassword,
    });
    res.status(200).json({ status: "Password Changed successfully!!" });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token has expired" });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const forgotPasswordHandler = async (req, res, next) => {
  const { email } = req.body;

  try {
    const oldUser = await findUserByEmailOrName(email, "");
    if (!oldUser) {
      return res.status(401).json({ error: "User Does Not Exists!!" });
    }

    const token = jwt.sign(
      { email: oldUser.EmailAddress, id: oldUser.UserName },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    const link = `http://localhost:5173/reset_password/${oldUser.UserName}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "LandTitles",
        link: link,
      },
    });

    let response = {
      body: {
        name: oldUser.UserName,
        intro: "You have requested to reset your password.",
        action: {
          instructions: "Click the button below to reset your password:",
          button: {
            text: "Reset Password",
            link: link,
          },
        },
        outro: "If you didn't request this, you can ignore this email.",
      },
    };

    let mail = MailGenerator.generate(response);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: mail,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).json({ error: "Failed to send email" });
      } else {
        return res.json({ status: "Check Your Email to Reset Password!!" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const emailResetPasswordHandler = async (req, res) => {
  const { email, password, current_password } = req.body;

  const oldUser = await findUserByEmailOrName(email);
  if (!oldUser) {
    return res.status(401).json({ error: "User Not Exists!!" });
  }

  const checkPassword = await bcrypt.compare(
    current_password,
    oldUser.EncryptedPassword
  );

  if (!checkPassword) {
    return res.status(401).json({ error: "Current password does not match!" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    await updateUser({
      EmailAddress: oldUser.EmailAddress,
      ColumnName: "EncryptedPassword",
      ColumnValue: encryptedPassword,
    });
    res.status(200).json({ status: "Password Changed successfully!!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
