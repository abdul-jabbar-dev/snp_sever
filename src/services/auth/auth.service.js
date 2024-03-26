import sql from "mssql";
import { configg } from "../../config/db.js";
import { loadSqlQueries } from "../utils.js";

import pkg from "mssql";
import { ROLES_LIST } from "../../config/roles_list.js";
const { connect } = pkg;

export const findUserByEmailOrName = async (email, first_name) => {
  try {
    let pool = await connect(configg);
    const user = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("first_name", sql.VarChar, first_name)
      .query(
        `SELECT * FROM UserManagement WHERE FirstName = @first_name OR EmailAddress = @email`
      );
    return user.recordset ? user.recordset[0] : undefined;
  } catch (error) {
    throw error;
  }
};

export const findUserByUserName = async (UserName) => {
  try {
    let pool = await connect(configg);
    const user = await pool.request().input("UserName", sql.VarChar, UserName)
      .query(`
      SELECT * 
      FROM UserManagement
      WHERE UserName = @UserName;`);

    return user.recordset ? user.recordset[0] : undefined;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  const {
    first_name,
    last_name,
    email,
    password,
    department,
    user_role,
    user_name,
    Status,
  } = userData;

  let currentRole = user_role ? user_role : "general user";
  let isStatus = Status ? Status : "Pending";

  try {
    let pool = await connect(configg);
    const sqlQueries = await loadSqlQueries("auth");
    const userInsertResponse = await pool
      .request()
      .input("UserName", sql.VarChar, user_name)
      .input("FirstName", sql.VarChar, first_name)
      .input("LastName", sql.VarChar, last_name)
      .input("EmailAddress", sql.VarChar, email)
      .input("EncryptedPassword", sql.VarChar, password)
      .input("UserType", sql.VarChar, currentRole)
      .input("Dept", sql.NVarChar, department)
      .input("Status", sql.NVarChar, isStatus)
      .query(sqlQueries.UserRegister);

    if (userInsertResponse.rowsAffected[0] === 1) {
      const res = await findUserByEmailOrName(email, first_name);
      const userRes = {
        user_id: res.user_id,
        username: res.first_name + res.last_name,
      };

      return userRes;
    }
  } catch (error) {
    throw error;
  }
};

export const updateUserr = async (refreshToken, user_id) => {
  try {
    let pool = await connect(configg);
    const sqlQueries = await loadSqlQueries("auth");
    const userResponse = await pool
      .request()
      .input("userName", sql.Int, user_id)
      .input("refreshToken", sql.VarChar(1000), refreshToken)
      .query(sqlQueries.UpdateUser);
    return userResponse.recordset;
  } catch (error) {
    throw error;
  }
};

export const findUserByUserId = async (UserName) => {
  try {
    let pool = await connect(configg);
    const user = await pool
      .request()
      .input("UserName", sql.NVarChar, UserName)
      .query(`SELECT * FROM UserManagement WHERE UserName = @UserName;`);

    return user.recordset ? user.recordset[0] : undefined;
  } catch (error) {
    throw error;
  }
};

// export const findRequestedUser = async () => {
//   try {
//     let pool = await connect(configg);

//     // const userRecords = await pool.request().query(`
//     //     SELECT UserName, FirstName, LastName, EmailAddress, UserType, Dept, Status, ImageURL, CreatedAt
//     //     FROM UserManagement
//     //     WHERE UserType != 'super_admin' AND Status = 'Pending'
//     //     ORDER BY Status DESC;
//     //   `);
//        const userRecords = await pool.request().query(`
//         SELECT UserName, FirstName, LastName, EmailAddress, UserType, Dept, Status, ImageURL, CreatedAt
//         FROM UserManagement
//         WHERE UserType != 'super_admin'
//         ORDER BY Status DESC;
//       `);

//     return userRecords.recordset;
//   } catch (error) {
//     throw error;
//   }
// };

export const findRequestedUser = async ({ limit, skip, filter }) => {
  try {
    
    let pool = await connect(configg);

    let field;
    if (Object.values(ROLES_LIST).includes(filter)) {
      field = `${
        filter
          ? `AND (UserType LIKE '%${filter}%' AND Status LIKE 'Accepted')`
          : ""
      } `;
    } else {
      field = `AND Status LIKE '%${filter}%'`;
    }

    const request = pool.request();
    const query = `
    SELECT UserName, FirstName, LastName, EmailAddress, UserType, Dept, Status, ImageURL, CreatedAt
    FROM UserManagement
    WHERE UserType != 'super_admin'
    ${field}
    ORDER BY CreatedAt DESC
    OFFSET @Skip ROWS
    FETCH NEXT @Limit ROWS ONLY;
`;

    request.input("Limit", sql.Int, limit);
    request.input("Skip", sql.Int, skip);

    const userRecords = await request.query(query);
    const countQuery = await request.query(`
    SELECT COUNT(*) AS TotalCount
    FROM UserManagement
    WHERE UserType != 'super_admin'
      ${field}
`);
  
    return {
      data: userRecords.recordset,
      count: countQuery.recordset[0].TotalCount,
    };
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data) => {
  const { UserName, EmailAddress, ColumnName, ColumnValue } = data;

  const getSqlType = (columnType) => {
    switch (typeof columnType) {
      case "object":
        return sql.DateTime;
      case "number":
        return sql.Int;
      case "string":
        return sql.NVarChar(255);
      default:
        throw new Error(`Unsupported column type: ${columnType}`);
    }
  };

  try {
    let pool = await connect(configg);

    const request = pool
      .request()
      .input("ColumnValue", getSqlType(ColumnValue), ColumnValue)
      .input("Username", sql.VarChar(255), UserName)
      .input("EmailAddress", sql.NVarChar(100), EmailAddress);

    const validColumns = [
      "FirstName",
      "LastName",
      "EmailAddress",
      "EncryptedPassword",
      "UserType",
      "Dept",
      "Status",
      "ImageURL",
      "CreatedAt",
    ];

    if (!validColumns.includes(ColumnName)) {
      throw new Error(`Invalid column name: ${ColumnName}`);
    }

    await request.query(`
      UPDATE UserManagement
      SET ${ColumnName} = @ColumnValue
      WHERE UserName = @Username OR EmailAddress = @EmailAddress;
    `);
  } catch (error) {
    throw error;
  }
};
