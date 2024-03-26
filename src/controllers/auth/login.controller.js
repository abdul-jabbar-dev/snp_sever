import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import {
  createRefreshToken,
  deleteAllRefreshToken,
  deleteRefreshToken,
  findRefreshToken,
} from "../../services/auth/token.service.js";

import { findUserByEmailOrName } from "../../services/auth/auth.service.js";

config();

export const loginHandlerrrr = async (req, res, next) => {
  const cookies = req.cookies;

  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required!!!!" });

  const existingUser = await findUserByEmailOrName(email, "");
  if (!existingUser) {
    return res.sendStatus(401);
  }

  const checkPassword = await bcrypt.compare(
    password,
    existingUser.EncryptedPassword
  );

  if (checkPassword) {
    const newAccessToken = jwt.sign(
      {
        UserInfo: {
          username: existingUser.UserName,
          role: existingUser.UserType,
          dept: existingUser.Dept,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10d" }
    );

    const newRefreshToken = jwt.sign(
      { username: existingUser.UserName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "10d" }
    );

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await findRefreshToken(refreshToken);
      if (!foundToken) {
        await deleteAllRefreshToken(existingUser.UserName);
      } else {
        await deleteRefreshToken(foundToken.UserName, foundToken.token_id);
      }

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    await createRefreshToken(existingUser.UserName, newRefreshToken);
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken: newAccessToken, role: existingUser.UserType });
  } else {
    res.sendStatus(401);
  }
};

export const loginHandler = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!!!!" });
    }

    const existingUser = await findUserByEmailOrName(email, "");

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (
      existingUser.Status === "Pending" ||
      existingUser.Status === "Rejected"
    ) {
      return res.status(403).json({ message: "Wait for admin Accept!!" });
    }

    const checkPassword = await bcrypt.compare(
      password,
      existingUser.EncryptedPassword
    );

    if (checkPassword) {
      const newAccessToken = jwt.sign(
        {
          UserInfo: {
            username: existingUser.UserName,
            role: existingUser.UserType,
            dept: existingUser.Dept,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10d" }
      );

      const newRefreshToken = jwt.sign(
        { username: existingUser.UserName },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "10d" }
      );

      if (cookies?.jwt) {
        const refreshToken = cookies.jwt;
        const foundToken = await findRefreshToken(refreshToken);
        if (!foundToken) {
          await deleteAllRefreshToken(existingUser.UserName);
        } else {
          await deleteRefreshToken(foundToken.UserName, foundToken.token_id);
        }
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
      }

      await createRefreshToken(existingUser.UserName, newRefreshToken);

      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken: newAccessToken, role: existingUser.UserType });
    } else {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};
