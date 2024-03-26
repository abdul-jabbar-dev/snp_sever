import sql from "mssql";
import { configg } from "../../config/db.js";

import pkg from "mssql";
const { connect } = pkg;

export const findRefreshToken = async (refreshToken) => {
  try {
    let pool = await connect(configg);
    const user = await pool
      .request()
      .input("refreshToken", sql.NVarChar(sql.Max), refreshToken)
      .query(`SELECT * FROM RefreshTokens WHERE refreshToken = @refreshToken;`);
    return user.recordset ? user.recordset[0] : undefined;
  } catch (error) {
    console.error("Error in findUser:", error);
    throw error;
  }
};

export const updateRefreshTokenByTokenId = async (
  token_id,
  newRefreshToken
) => {
  try {
    let pool = await connect(configg);
    const result = await pool
      .request()
      .input("token_id", sql.Int, token_id)
      .input("newRefreshToken", sql.NVarChar(sql.MAX), newRefreshToken).query(`
          UPDATE RefreshTokens
          SET refreshToken = @newRefreshToken
          WHERE token_id = @token_id;
        `);

    return result.recordset ? result.recordset[0] : undefined;
  } catch (error) {
    console.error("Error in updateRefreshTokenByTokenId:", error);
    throw error;
  }
};

export const deleteAllRefreshToken = async (UserName) => {
  try {
    let pool = await connect(configg);
    const result = await pool
      .request()
      .input("UserName", sql.NVarChar, UserName)
      .query(`DELETE FROM RefreshTokens WHERE UserName = @UserName`);

    return result.recordset ? result.recordset[0] : undefined;
  } catch (error) {
    console.error("Error in deleteRefreshTokenByUserId:", error);
    throw error;
  }
};

export const deleteRefreshToken = async (UserName, token_id) => {
  try {
    let pool = await connect(configg);
    const result = await pool
      .request()
      .input("UserName", sql.NVarChar, UserName)
      .input("token_id", sql.Int, token_id)
      .query(
        `DELETE FROM RefreshTokens WHERE UserName = @UserName AND token_id = @token_id`
      );

    return result.recordset ? result.recordset[0] : undefined;
  } catch (error) {
    console.error("Error in deleteRefreshToken:", error);
    throw error;
  }
};

export const createRefreshToken = async (userName, refreshToken) => {
  try {
    let pool = await connect(configg);
    const result = await pool
      .request()
      .input("userName", sql.NVarChar, userName)
      .input("refreshToken", sql.NVarChar(sql.Max), refreshToken)
      .query(
        `INSERT INTO RefreshTokens (userName, refreshToken) VALUES (@userName, @refreshToken)`
      );

    return result.recordset ? result.recordset[0] : undefined;
  } catch (error) {
    console.error("Error in createRefreshToken:", error);
    throw error;
  }
};

export const deleteByRefreshTokenId = async (token_id) => {
  try {
    let pool = await connect(configg);
    const result = await pool
      .request()
      .input("token_id", sql.Int, token_id)
      .query(`DELETE FROM RefreshTokens WHERE token_id = @token_id`);

    return result.recordset ? result.recordset[0] : undefined;
  } catch (error) {
    console.error("Error in deleteRefreshTokenByUserId:", error);
    throw error;
  }
};
