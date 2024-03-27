import pkg from "mssql";
import { loadSqlQueries } from "../utils.js";
const { connect, Int, VarChar } = pkg;
import { configg } from "../../config/db.js";
import sql from "mssql";

export const getPendingIndexCard = async (role, pageSize, offset) => {
  let sqlStatement;
  if (role === "NLA") {
    sqlStatement = `
        SELECT ApplicationNo, NameOfOwner, Stage, StageLevel, Volume, Folio
        FROM IndexCard
        WHERE Stage = 'Stage 2' AND StageLevel != 'Completed'
        ORDER BY ApplicationNo
        OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY
    `;
  } else if (role === "SNAPSI") {
    sqlStatement = `
        SELECT ApplicationNo, NameOfOwner, Stage, StageLevel, Volume, Folio
        FROM IndexCard
        WHERE Stage IN ('Stage 1', 'Stage 3')
        ORDER BY ApplicationNo
        OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY
    `;
  }

  try {
    let pool = await connect(configg);
    const indexCardRecord = await pool
      .request()
      .input("Offset", sql.Int, offset)
      .input("PageSize", sql.Int, pageSize)
      .query(sqlStatement);
    return indexCardRecord.recordset;
  } catch (error) {
    return { error: "An error occurred while updating identity." };
  }
};

export const getPendingLandData = async (role) => {
  let sqlStatement;

  if (role === "NLA") {
    sqlStatement = `
            SELECT VolumeNo, FolioNo, Stage, StageLevel
            FROM OriginatingInfo
            WHERE Stage = 'Stage 2'  AND StageLevel != 'Completed'
        `;
  } else if (role === "SNAPSI") {
    sqlStatement = `
            SELECT VolumeNo, FolioNo, Stage, StageLevel
            FROM OriginatingInfo
            WHERE Stage IN ('Stage 1', 'Stage 3')
        `;
  }

  try {
    let pool = await connect(configg);
    const indexCardRecord = await pool.request().query(sqlStatement);
    return indexCardRecord.recordset;
  } catch (error) {
    return { error: "An error occurred while updating identity." };
  }
};

export const UpdateAdminIndexCardStage = async (data) => {
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
          AND Folio = @AttributeFolioNo
        
        UPDATE AttributeProperties
        SET AttributeStatus = 'Yes'
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

export const UpdateAdminLandDataStage = async (data) => {
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
        
        UPDATE AttributeProperties
        SET AttributeStatus = 'Yes'
        WHERE
          AttributeTableName = 'OriginatingInfo'
          AND AttributeVolumeNo = @AttributeVolumeNo
          AND AttributeFolioNo = @AttributeFolioNo;
      `);
    return updatedRecord.recordset;
  } catch (error) {
    return { error: "An error occurred while updating stage level" };
  }
};
