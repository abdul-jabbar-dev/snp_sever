import pkg from "mssql";
import { loadSqlQueries } from "../utils.js";
const { connect, Int, VarChar } = pkg;
import sql from "mssql";
import { configg } from "../../config/db.js";

export const UpdateIndexCardVerified = async (data) => {
  const { ApplicationNo, VerifiedValue } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
              UPDATE IndexCard
              SET Verified = @VerifiedValue
              WHERE ApplicationNo = @ApplicationNo
          `;
    const indexCardRecord = await pool
      .request()
      .input("ApplicationNo", sql.VarChar, ApplicationNo)
      .input("VerifiedValue", sql.VarChar, VerifiedValue)
      .query(sqlStatement);

    return indexCardRecord.recordset;
  } catch (error) {
    console.error("Error in updateIndexCard!!:", error);
    return { error: "An error occurred while updating indexCardVerified!!." };
  }
};

export const getIndexCardDetails = async (data) => {
  const { ApplicationNo } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
                SELECT *
                FROM IndexCard
                WHERE ApplicationNo = @ApplicationNo
            `;

    const indexCardRecord = await pool
      .request()
      .input("ApplicationNo", sql.VarChar, ApplicationNo)
      .query(sqlStatement);
    return indexCardRecord.recordset;
  } catch (error) {
    console.error("Error in updateIdentity:", error);
    return { error: "An error occurred while updating identity." };
  }
};

export const UpdateIndexCardComment = async (data) => {
  const { EvaluationComment, ApplicationNo, NameOfOwner } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
              UPDATE IndexCard
              SET EvaluationComment = @EvaluationComment
              WHERE ApplicationNo = @ApplicationNo
              AND NameOfOwner = @NameOfOwner
          `;
    const indexCardRecord = await pool
      .request()
      .input("ApplicationNo", sql.VarChar, ApplicationNo)
      .input("EvaluationComment", sql.VarChar, EvaluationComment)
      .input("NameOfOwner", sql.VarChar, NameOfOwner)

      .query(sqlStatement);

    return indexCardRecord.recordset;
  } catch (error) {
    return { error: "An error occurred while updating indexComment!." };
  }
};

export const GetIndexAttribute = async (data) => {
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

export const UpdateIndexAttribute = async (data) => {
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

export const CreateIndexAttribute = async (data) => {
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

export const CommentIndexAttribute = async (data) => {
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

export const UpdateIndexCardValue = async (data) => {
  const { ApplicationNo, AttributeName, editedValue } = data;

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
      .input("ApplicationNo", sql.NVarChar, ApplicationNo)
      .input("EditedValue", inputType, editedValue).query(`
        UPDATE IndexCard
        SET ${AttributeName} = @EditedValue
        WHERE
         ApplicationNo = @ApplicationNo
      `);

    return updatedRecord.rowsAffected[0];
  } catch (error) {
    console.error("Error in IndexCardValue:", error);
    return { error: "An error occurred while updating IndexCardValue status." };
  }
};

export const GetAllIndexAttributes = async (data) => {
  const { AttributeTableName, AttributeVolumeNo, AttributeFolioNo } = data;

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
    return { error: "An error occurred while retrieving attribute status." };
  }
};

export const CheckAllVerfied = async (data) => {
  const { checkedValue, ApplicationNo, VolumeNo, FolioNo, StageLevel } = data;
  try {
    let pool = await connect(configg);
    const updatedRecord = await pool
      .request()
      .input("ApplicationNo", sql.NVarChar, ApplicationNo)
      .input("checkedValue", sql.NVarChar, checkedValue)
      .input("AttributeVolumeNo", sql.Int, VolumeNo)
      .input("StageLevel", sql.NVarChar, StageLevel)
      .input("AttributeFolioNo", sql.Int, FolioNo).query(`
        UPDATE IndexCard
        SET Verified = @checkedValue, StageLevel = @StageLevel
        WHERE
          ApplicationNo = @ApplicationNo
          AND VolumeNo = @AttributeVolumeNo
          AND FolioNo = @AttributeFolioNo;

        UPDATE AttributeProperties
        SET AttributeStatus = @checkedValue
        WHERE
          AttributeTableName = 'IndexCard'
          AND AttributeVolumeNo = @AttributeVolumeNo
          AND AttributeFolioNo = @AttributeFolioNo;
      `);
    return updatedRecord.recordset;
  } catch (error) {
    return { error: "An error occurred while updating stage level" };
  }
};

export const UpdateIndexCardStage = async (data) => {
  const { Stage, StageLevel, ApplicationNo, VolumeNo, FolioNo } = data;
  try {
    let pool = await connect(configg);
    const updatedRecord = await pool
      .request()
      .input("NewStage", sql.NVarChar, Stage)
      .input("NewStageLevel", sql.NVarChar, StageLevel)
      .input("ApplicationNo", sql.NVarChar, ApplicationNo)
      .input("AttributeVolumeNo", sql.Int, VolumeNo)
      .input("AttributeFolioNo", sql.Int, FolioNo).query(`
        UPDATE IndexCard
        SET Stage = @NewStage, StageLevel = @NewStageLevel
        WHERE
          ApplicationNo = @ApplicationNo
          AND Volume = @AttributeVolumeNo
          AND Folio = @AttributeFolioNo;

        UPDATE AttributeProperties
        SET AttributeStatus = @NewStageLevel
          WHERE
            AttributeTableName = 'IndexCard'
            AND AttributeVolumeNo = @AttributeVolumeNo
            AND AttributeFolioNo = @AttributeFolioNo;
  
      `);
    return updatedRecord.recordset;
  } catch (error) {
    return { error: "An error occurred while updating stage level" };
  }
};
