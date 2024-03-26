import { configg } from "../../config/db.js";
import pkg from "mssql";
import { loadSqlQueries } from "../utils.js";
const { connect, Int, VarChar } = pkg;
import sql from "mssql";

export const createOrUpdateTableComment = async (data) => {
  const { IdentityName, comment, VolumeNo, FolioNo } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
              UPDATE ${IdentityName}
              SET EvaluationComment = @EvaluationComment
              WHERE VolumeNo = @VolumeNo
              AND FolioNo = @FolioNo
          `;

    const tableCommentList = await pool
      .request()
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("EvaluationComment", sql.VarChar, comment)
      .query(sqlStatement);

    return tableCommentList.recordset;
  } catch (error) {
    console.error("Error in updateIdentity:", error);
    return { error: "An error occurred while updating identity." };
  }
};

export const getTableComment = async (data) => {
  const { IdentityName, VolumeNo, FolioNo } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
                SELECT *
                FROM ${IdentityName}
                WHERE VolumeNo = @VolumeNo
                AND FolioNo = @FolioNo
            `;

    const tableCommentList = await pool
      .request()
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .query(sqlStatement);

    return tableCommentList.recordset;
  } catch (error) {
    console.error("Error in updateIdentity:", error);
    return { error: "An error occurred while updating identity." };
  }
};

export const attributeComment = async (data) => {
  const { TableName, AttributeName, CommentValue } = data;

  try {
    let pool = await connect(configg);
    const tableCommentList = await pool
      .request()
      .input("TableName", sql.NVarChar, TableName)
      .input("AttributeName", sql.NVarChar, AttributeName)
      .input("CommentValue", sql.NVarChar, CommentValue).query(`
        INSERT INTO Comments (TableName, AttributeName, CommentValue)
        VALUES (@TableName, @AttributeName, @CommentValue);

        SELECT * FROM Comments WHERE CommentID = SCOPE_IDENTITY();
      `);

    // Assuming you want to return the inserted record
    return tableCommentList.recordset;
  } catch (error) {
    console.error("Error in attributeComment:", error);
    return { error: "An error occurred while updating identity." };
  }
};

export const GetAttribute = async (data) => {
  const {
    AttributeTableName,
    AttributeName,
    AttributeVolumeNo,
    AttributeFolioNo,
    AttributeUser,
  } = data;

  try {
    let pool = await connect(configg);
    const retrievedRecord = await pool
      .request()
      .input("AttributeTableName", sql.NVarChar, AttributeTableName)
      .input("AttributeName", sql.NVarChar, AttributeName)
      .input("AttributeVolumeNo", sql.Int, AttributeVolumeNo)
      .input("AttributeFolioNo", sql.Int, AttributeFolioNo).query(`
        SELECT *
        FROM AttributeProperties
        WHERE
          AttributeTableName = @AttributeTableName
          AND AttributeName = @AttributeName
          AND AttributeVolumeNo = @AttributeVolumeNo
          AND AttributeFolioNo = @AttributeFolioNo
      `);

    return retrievedRecord.recordset.length > 0
      ? retrievedRecord.recordset[0]
      : null;
  } catch (error) {
    console.error("Error in GetAttributeStatus:", error);
    return { error: "An error occurred while retrieving attribute status." };
  }
};

export const UpdateAttribute = async (data) => {
  const {
    AttributeTableName,
    AttributeName,
    AttributeVolumeNo,
    AttributeFolioNo,
    AttributeUser,
    AttributeValue,
    AttributeColumn,
  } = data;

  try {
    const sqlDataType =
      typeof AttributeValue === "string" ? sql.NVarChar : sql.Int;

    let pool = await connect(configg);
    const updatedRecord = await pool
      .request()
      .input("AttributeTableName", sql.NVarChar, AttributeTableName)
      .input("AttributeName", sql.NVarChar, AttributeName)
      .input("AttributeVolumeNo", sql.Int, AttributeVolumeNo)
      .input("AttributeFolioNo", sql.Int, AttributeFolioNo)
      .input("NewAttributeValue", sqlDataType, AttributeValue).query(`
        UPDATE AttributeProperties
        SET ${AttributeColumn} = @NewAttributeValue
        WHERE
          AttributeTableName = @AttributeTableName
          AND AttributeName = @AttributeName
          AND AttributeVolumeNo = @AttributeVolumeNo
          AND AttributeFolioNo = @AttributeFolioNo
        

        SELECT * FROM AttributeProperties
        WHERE
          AttributeTableName = @AttributeTableName
          AND AttributeName = @AttributeName
          AND AttributeVolumeNo = @AttributeVolumeNo
          AND AttributeFolioNo = @AttributeFolioNo
      `);

    return updatedRecord.recordset[0];
  } catch (error) {
    console.error("Error in UpdateAttributeStatus:", error);
    return { error: "An error occurred while updating attribute status." };
  }
};

export const CreateAttribute = async (data) => {
  const {
    AttributeTableName,
    AttributeName,
    AttributeVolumeNo,
    AttributeFolioNo,
    AttributeUser,
    AttributeValue,
    AttributeColumn,
  } = data;

  const sqlDataType =
    typeof AttributeValue === "string" ? sql.NVarChar : sql.Int;

  try {
    let pool = await connect(configg);
    const insertedRecord = await pool
      .request()
      .input("AttributeTableName", sql.NVarChar, AttributeTableName)
      .input("AttributeName", sql.NVarChar, AttributeName)
      .input("AttributeVolumeNo", sql.Int, AttributeVolumeNo)
      .input("AttributeFolioNo", sql.Int, AttributeFolioNo)
      .input("AttributeUser", sql.NVarChar, AttributeUser)
      .input("AttributeValue", sqlDataType, AttributeValue).query(`
        INSERT INTO AttributeProperties (
          AttributeTableName,
          AttributeName,
          AttributeVolumeNo,
          AttributeFolioNo,
          AttributeUser,
          ${AttributeColumn}
        ) 
        OUTPUT Inserted.*
        VALUES (
          @AttributeTableName,
          @AttributeName,
          @AttributeVolumeNo,
          @AttributeFolioNo,
          @AttributeUser,
          @AttributeValue
        );
      `);
    return insertedRecord.recordset[0];
  } catch (error) {
    console.error("Error in CreateAttributeStatus:", error);
    return { error: "An error occurred while creating attribute status." };
  }
};

export const UpdateTableData = async (data) => {
  const {
    AttributeTableName,
    AttributeName,
    AttributeVolumeNo,
    AttributeFolioNo,
    editedValue,
  } = data;

  try {
    let pool = await connect(configg);

    let inputType;

    switch (typeof editedValue) {
      case "string":
        inputType = sql.NVarChar;
        break;
      case "number":
        inputType = sql.Int;
        break;
      case "object":
        inputType = sql.DateTime;
        break;
      default:
        throw new Error(
          `Unsupported type for editedValue: ${typeof editedValue}`
        );
    }

    const updatedRecord = await pool
      .request()
      .input("AttributeVolumeNo", sql.Int, AttributeVolumeNo)
      .input("AttributeFolioNo", sql.Int, AttributeFolioNo)
      .input("EditedValue", inputType, editedValue).query(`
        UPDATE ${AttributeTableName}
        SET ${AttributeName} = @EditedValue
        WHERE
          VolumeNo = @AttributeVolumeNo
          AND FolioNo = @AttributeFolioNo
      `);

    return updatedRecord.rowsAffected[0];
  } catch (error) {
    console.error("Error in UpdateAttributeStatus:", error);
    return { error: "An error occurred while updating attribute status." };
  }
};

export const GetProperties = async (data) => {
  const {
    AttributeTableName,
    AttributeVolumeNo,
    AttributeFolioNo,
    AttributeUser,
  } = data;

  try {
    let pool = await connect(configg);
    const retrievedRecord = await pool
      .request()
      .input("AttributeTableName", sql.NVarChar, AttributeTableName)
      .input("AttributeVolumeNo", sql.Int, AttributeVolumeNo)
      .input("AttributeFolioNo", sql.Int, AttributeFolioNo).query(`
        SELECT *
        FROM AttributeProperties
        WHERE
          AttributeTableName = @AttributeTableName
          AND AttributeVolumeNo = @AttributeVolumeNo
          AND AttributeFolioNo = @AttributeFolioNo
      `);
    return retrievedRecord.recordset;
  } catch (error) {
    console.error("Error in GetAttributeStatus:", error);
    return { error: "An error occurred while retrieving attribute status." };
  }
};

export const GetPropertiesTableData = async (data) => {
  const { AttributeTableName, AttributeVolumeNo, AttributeFolioNo } = data;

  try {
    let pool = await connect(configg);
    const retrievedRecord = await pool
      .request()
      .input("TableName", sql.NVarChar, AttributeTableName)
      .input("VolumeNo", sql.Int, AttributeVolumeNo)
      .input("FolioNo", sql.Int, AttributeFolioNo).query(`
        SELECT *
        FROM ${AttributeTableName}
        WHERE
          VolumeNo = @VolumeNo
          AND FolioNo = @FolioNo
      `);
    return retrievedRecord.recordset.length > 0
      ? retrievedRecord.recordset[0]
      : null;
  } catch (error) {
    console.error("Error in GetAttributeStatus:", error);
    return { error: "An error occurred while retrieving attribute status." };
  }
};

export const CheckedPropertiesAll = async (data) => {
  const { VolumeNo, FolioNo, Verified, StageLevel } = data;

  try {
    let pool = await connect(configg);
    const sqlQueries = await loadSqlQueries("lands");
    const retrievedRecord = await pool
      .request()
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("NewVerifiedValue", sql.VarChar, Verified)
      .input("StageLevel", sql.VarChar, StageLevel)
      .input("AttributeVerified", sql.VarChar, Verified)
      .query(sqlQueries.UpdateChecked);
    return retrievedRecord.recordset;
  } catch (error) {
    console.error("Error in GetAttributeStatus:", error);
    return { error: "An error occurred while retrieving attribute status." };
  }
};

export const UpdateStage = async (data) => {
  const { Stage, StageLevel, VolumeNo, FolioNo } = data;
  try {
    let pool = await connect(configg);
    const updatedRecord = await pool
      .request()
      .input("NewStage", sql.NVarChar, Stage)
      .input("NewStageLevel", sql.NVarChar, StageLevel)
      .input("AttributeVolumeNo", sql.Int, VolumeNo)
      .input("AttributeFolioNo", sql.Int, FolioNo).query(`
        UPDATE OriginatingInfo
        SET Stage = @NewStage, StageLevel = @NewStageLevel
        WHERE
          VolumeNo = @AttributeVolumeNo
          AND FolioNo = @AttributeFolioNo
      `);
    return updatedRecord.recordset;
  } catch (error) {
    return { error: "An error occurred while updating stage level" };
  }
};

export const UpdateCheckedTable = async (data) => {
  const { checkedValue, IdentityName, VolumeNo, FolioNo } = data;

  try {
    let pool = await connect(configg);
    const updatedRecord = await pool
      .request()
      .input("IdentityName", sql.NVarChar, IdentityName)
      .input("checkedValue", sql.NVarChar, checkedValue)
      .input("AttributeVolumeNo", sql.Int, VolumeNo)
      .input("AttributeFolioNo", sql.Int, FolioNo).query(`
        UPDATE ${IdentityName}
        SET Verified = @checkedValue
        WHERE
          VolumeNo = @AttributeVolumeNo
          AND FolioNo = @AttributeFolioNo;

        UPDATE AttributeProperties
        SET AttributeStatus = @checkedValue
        WHERE
          AttributeTableName =  @IdentityName
          AND AttributeVolumeNo = @AttributeVolumeNo
          AND AttributeFolioNo = @AttributeFolioNo;
      `);
    return updatedRecord.recordset;
  } catch (error) {
    return { error: "An error occurred while updating stage level" };
  }
};
