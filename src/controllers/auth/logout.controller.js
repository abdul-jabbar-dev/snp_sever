import {
  findRefreshToken,
  deleteRefreshToken,
} from "../../services/auth/token.service.js";

export const logoutHandler = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(204); // No content
    }
    const refreshToken = cookies.jwt;
    const existRefreshToken = await findRefreshToken(refreshToken);

    if (existRefreshToken) {
      await deleteRefreshToken(
        existRefreshToken.UserName,
        existRefreshToken.token_id
      );
    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  } catch (error) {
    console.error("Error in logoutHandler:", error);
    res.sendStatus(500);
  }
};
