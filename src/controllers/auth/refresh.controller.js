import { config } from "dotenv";
import jwt from "jsonwebtoken";
import {
  deleteAllRefreshToken,
  findRefreshToken,
  updateRefreshTokenByTokenId,
} from "../../services/auth/token.service.js";
import {
  findUserByEmailOrName,
  findUserByUserId,
} from "../../services/auth/auth.service.js";

config();

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401); //unauthorized

  const refreshToken = cookies.jwt;

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  const foundRefreshToken = await findRefreshToken(refreshToken);

  if (!foundRefreshToken) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); //Forbidden
        const hackedUser = await findUserByEmailOrName("", decoded.username);
        await deleteAllRefreshToken(hackedUser.UserName);
      }
    );
    return res.sendStatus(403);
  }

  const foundUser = await findUserByUserId(foundRefreshToken.UserName);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        await updateRefreshTokenByTokenId(foundRefreshToken.token_id, "");
      }

      if (err || foundUser.FirstName !== decoded.username)
        return res.sendStatus(403);

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            roles: foundUser.UserType,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );

      const newRefreshToken = jwt.sign(
        { username: foundUser.UserName },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      await updateRefreshTokenByTokenId(
        foundRefreshToken.token_id,
        newRefreshToken
      );
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ role: foundUser.UserType, accessToken });
    }
  );
};
