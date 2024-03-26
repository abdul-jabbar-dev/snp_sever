import { configg } from "../../config/db.js";
import pkg from "mssql";
import { loadSqlQueries } from "../utils.js";
const { connect, Int, VarChar } = pkg;
import sql from "mssql";

export const getLands = async (data) => {
  const { VolumeNo, FolioNo, Parish, CaveatNo, StrataApplicationID } =
    data.values;
  const { pageOf, pageNumber } = data;
  try {
    let pool = await connect(configg);
    const landList = await pool
      .request()
      .input("VolumeNo", sql.Int, VolumeNo || null)
      .input("FolioNo", sql.Int, FolioNo || null)
      .input("Parish", sql.NVarChar, Parish || null)
      .input("CaveatNo", sql.NVarChar, CaveatNo || null)
      .input("StrataApplicationID", sql.Int, StrataApplicationID || null)
      .input("Offset", sql.Int, pageOf)
      .input("PageSize", sql.Int, pageNumber).query(`
        SELECT OI.VolumeNo, OI.FolioNo
        FROM OriginatingInfo OI
        LEFT JOIN Caveat C ON OI.VolumeNo = C.VolumeNo AND OI.FolioNo = C.FolioNo
        LEFT JOIN StrataApplication SA ON OI.VolumeNo = SA.VolumeNo AND OI.FolioNo = SA.FolioNo
        WHERE
          (OI.VolumeNo = @VolumeNo OR @VolumeNo IS NULL)
          AND (OI.FolioNo = @FolioNo OR @FolioNo IS NULL)
          AND (OI.Parish = @Parish OR @Parish IS NULL)
          AND (C.CaveatInstrumentNo = @CaveatNo OR @CaveatNo IS NULL)
          AND (SA.StrataApplicationInstruemntNo = @StrataApplicationID OR @StrataApplicationID IS NULL)
        ORDER BY OI.VolumeNo OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;
      `);
    return landList.recordset;
  } catch (error) {
    console.error("Error in getLands:", error);
    return { error: "An error occurred while fetching lands." };
  }
};

export const getLandsUnion = async (data) => {
  const { VolumeNo, FolioNo, Parish, CaveatNo, StrataApplicationID } =
    data.values;
  const { pageOf, pageNumber } = data;

  try {
    let pool = await connect(configg);
    const sqlQueries = await loadSqlQueries("lands");
    const landList = await pool
      .request()
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("Parish", sql.NVarChar, Parish)
      .input("CaveatNo", sql.NVarChar, CaveatNo)
      .input("StrataApplicationID", sql.Int, StrataApplicationID)
      .input("Offset", sql.Int, pageOf)
      .input("PageSize", sql.Int, pageNumber)
      .query(sqlQueries.GetLands);
    return landList.recordset;
  } catch (error) {
    console.error("Error in getLands:", error);
    return { error: "An error occurred while fetching lands." };
  }
};

export const getIndexCards = async (query, pageOf, pageNumber) => {
  try {
    let pool = await connect(configg);
    const request = pool
      .request()
      .input("Offset", sql.Int, pageOf)
      .input("PageSize", sql.Int, pageNumber);

    const landList = await request.query(
      `${query} ORDER BY ApplicationNo OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY`
    );
    return landList.recordset;
  } catch (error) {
    console.error("Error in getIndexCards:", error);
    return { error: "An error occurred while fetching lands." };
  }
};

export const lendTitleDetails = async (query, data) => {
  const { VolumeNo, FolioNo } = data;
  try {
    let pool = await connect(configg);
    const sqlQueries = await loadSqlQueries("lands");
    const landList = await pool
      .request()
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .query(query);
    return landList.recordset;
  } catch (error) {
    console.error("Error in getLands:", error);
    return { error: "An error occurred while fetching lands." };
  }
};

export const updateIdentity = async (data) => {
  const { VolumeNo, FolioNo, IdentityName, verified } = data;
  let Verified = verified ? "Yes" : "No";

  try {
    let pool = await connect(configg);
    const sqlStatement = `
            UPDATE ${IdentityName}
            SET Verified = @Verified
            WHERE VolumeNo = @VolumeNo
            AND FolioNo = @FolioNo
        `;

    const identityList = await pool
      .request()
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("Verified", sql.VarChar, Verified)
      .query(sqlStatement);

    return identityList.recordset;
  } catch (error) {
    console.error("Error in updateIdentity:", error);
    return { error: "An error occurred while updating identity." };
  }
};
