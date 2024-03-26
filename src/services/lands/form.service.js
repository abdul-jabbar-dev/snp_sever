import { configg } from "../../config/db.js";
import pkg from "mssql";
import { loadSqlQueries } from "../utils.js";
const { connect, Int, VarChar } = pkg;
import sql from "mssql";

export const insertTransferData = async (data) => {
  const {
    TransferInstrumentNo,
    VolumeNo,
    FolioNo,
    StatusOfInstrument,
    RegistrationDate,
    NameOfTransferee,
    TransfereeAddress,
    OccupationOfTransferee,
    NameOfTransferor,
    TenancyType,
    Consideration,
    ConsiderationRemark,
    TransferCurrency,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO Transfer (
          TransferInstrumentNo,
          VolumeNo,
          FolioNo,
          StatusOfInstrument,
          RegistrationDate,
          NameOfTransferee,
          TransfereeAddress,
          OccupationOfTransferee,
          NameOfTransferor,
          TenancyType,
          Consideration,
          ConsiderationRemark,
          TransferCurrency,
          Verified,
          EvaluationComment
        )
        VALUES (
          @TransferInstrumentNo,
          @VolumeNo,
          @FolioNo,
          @StatusOfInstrument,
          @RegistrationDate,
          @NameOfTransferee,
          @TransfereeAddress,
          @OccupationOfTransferee,
          @NameOfTransferor,
          @TenancyType,
          @Consideration,
          @ConsiderationRemark,
          @TransferCurrency,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("TransferInstrumentNo", sql.Int, TransferInstrumentNo)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("StatusOfInstrument", sql.VarChar(25), StatusOfInstrument || null)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("NameOfTransferee", sql.VarChar(255), NameOfTransferee || null)
      .input("TransfereeAddress", sql.VarChar(255), TransfereeAddress || null)
      .input(
        "OccupationOfTransferee",
        sql.VarChar(255),
        OccupationOfTransferee || null
      )
      .input("NameOfTransferor", sql.VarChar(255), NameOfTransferor || null)
      .input("TenancyType", sql.VarChar(255), TenancyType || null)
      .input("Consideration", sql.Decimal, Consideration || null)
      .input("ConsiderationRemark", sql.Text, ConsiderationRemark || null)
      .input("TransferCurrency", sql.VarChar(3), TransferCurrency || null)
      .input("Verified", sql.VarChar(25), Verified || null)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertTransferData:", error);
    throw new Error(
      "An error occurred while inserting data into the Transfer table."
    );
  }
};

export const insertMortgageData = async (data) => {
  const {
    MortgageInstrumentNo,
    VolumeNo,
    FolioNo,
    StatusOfInstrument,
    MortgageDate,
    MortgageInstitution,
    MortgageInstitutionAddress,
    Consideration,
    Currency,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO Mortgage (
          MortgageInstrumentNo,
          VolumeNo,
          FolioNo,
          StatusOfInstrument,
          MortgageDate,
          MortgageInstitution,
          MortgageInstitutionAddress,
          Consideration,
          Currency,
          Verified,
          EvaluationComment
        )
        VALUES (
          @MortgageInstrumentNo,
          @VolumeNo,
          @FolioNo,
          @StatusOfInstrument,
          @MortgageDate,
          @MortgageInstitution,
          @MortgageInstitutionAddress,
          @Consideration,
          @Currency,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("MortgageInstrumentNo", sql.Int, MortgageInstrumentNo)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("StatusOfInstrument", sql.VarChar(25), StatusOfInstrument || null)
      .input("MortgageDate", sql.Date, MortgageDate || null)
      .input(
        "MortgageInstitution",
        sql.VarChar(255),
        MortgageInstitution || null
      )
      .input(
        "MortgageInstitutionAddress",
        sql.Text,
        MortgageInstitutionAddress || null
      )
      .input("Consideration", sql.Decimal(10, 2), Consideration || null)
      .input("Currency", sql.VarChar(3), Currency || null)
      .input("Verified", sql.VarChar(255), Verified || null)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertMortgageData:", error);
    throw new Error(
      "An error occurred while inserting data into the Mortgage table."
    );
  }
};

export const insertLeaseData = async (data) => {
  const {
    LeaseInstrumentNo,
    VolumeNo,
    FolioNo,
    StatusOfInstrument,
    RegistrationDate,
    NameOfLessor,
    AddressOfLessor,
    OccupationOfLessor,
    NameOfLessee,
    AddressOfLessee,
    OccupationOfLessee,
    ActOfIncorporationOfLessee,
    TermsOfLease,
    Consideration,
    Currency,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO Lease (
          LeaseInstrumentNo,
          VolumeNo,
          FolioNo,
          StatusOfInstrument,
          RegistrationDate,
          NameOfLessor,
          AddressOfLessor,
          OccupationOfLessor,
          NameOfLessee,
          AddressOfLessee,
          OccupationOfLessee,
          ActOfIncorporationOfLessee,
          TermsOfLease,
          Consideration,
          Currency,
          Verified,
          EvaluationComment
        )
        VALUES (
          @LeaseInstrumentNo,
          @VolumeNo,
          @FolioNo,
          @StatusOfInstrument,
          @RegistrationDate,
          @NameOfLessor,
          @AddressOfLessor,
          @OccupationOfLessor,
          @NameOfLessee,
          @AddressOfLessee,
          @OccupationOfLessee,
          @ActOfIncorporationOfLessee,
          @TermsOfLease,
          @Consideration,
          @Currency,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("LeaseInstrumentNo", sql.Int, LeaseInstrumentNo)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("StatusOfInstrument", sql.VarChar(25), StatusOfInstrument || null)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("NameOfLessor", sql.VarChar(255), NameOfLessor || null)
      .input("AddressOfLessor", sql.VarChar(255), AddressOfLessor || null)
      .input("OccupationOfLessor", sql.VarChar(255), OccupationOfLessor || null)
      .input("NameOfLessee", sql.VarChar(255), NameOfLessee || null)
      .input("AddressOfLessee", sql.VarChar(255), AddressOfLessee || null)
      .input("OccupationOfLessee", sql.VarChar(255), OccupationOfLessee || null)
      .input(
        "ActOfIncorporationOfLessee",
        sql.Text,
        ActOfIncorporationOfLessee || null
      )
      .input("TermsOfLease", sql.Text, TermsOfLease || null)
      .input("Consideration", sql.Decimal, Consideration || null)
      .input("Currency", sql.VarChar(3), Currency || null)
      .input("Verified", sql.VarChar(255), Verified || null)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertLeaseData:", error);
    throw new Error(
      "An error occurred while inserting data into the Lease table."
    );
  }
};

export const insertSurrenderOfLeaseData = async (data) => {
  const {
    SurrenderOfLeaseNo,
    VolumeNo,
    FolioNo,
    RegistrationDate,
    LeaseNo,
    DateOfSurrender,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO SurrenderOfLease (
          SurrenderOfLeaseNo,
          VolumeNo,
          FolioNo,
          RegistrationDate,
          LeaseNo,
          DateOfSurrender,
          Verified,
          EvaluationComment
        )
        VALUES (
          @SurrenderOfLeaseNo,
          @VolumeNo,
          @FolioNo,
          @RegistrationDate,
          @LeaseNo,
          @DateOfSurrender,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("SurrenderOfLeaseNo", sql.Int, SurrenderOfLeaseNo)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("LeaseNo", sql.VarChar(255), LeaseNo || null)
      .input("DateOfSurrender", sql.Date, DateOfSurrender || null)
      .input("Verified", sql.VarChar(25), Verified || null)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    throw new Error(
      "An error occurred while inserting data into the SurrenderOfLease table."
    );
  }
};

export const insertPowerOfSaleTransferData = async (data) => {
  const {
    PowerOfSaleInstrumentNo,
    VolumeNo,
    FolioNo,
    StatusOfInstrument,
    RegistrationDate,
    NameOfTransferee,
    AddressOfTransferee,
    OccupationOfTransferee,
    Consideration,
    ConsiderationRemark,
    Currency,
    AreaLotNoBeingTransferred,
    DPNo,
    NewVolumes,
    NewFolios,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO PowerOfSaleTransfer (
          PowerOfSaleInstrumentNo,
          VolumeNo,
          FolioNo,
          StatusOfInstrument,
          RegistrationDate,
          NameOfTransferee,
          AddressOfTransferee,
          OccupationOfTransferee,
          Consideration,
          ConsiderationRemark,
          Currency,
          AreaLotNoBeingTransferred,
          DPNo,
          NewVolumes,
          NewFolios,
          Verified,
          EvaluationComment
        )
        VALUES (
          @PowerOfSaleInstrumentNo,
          @VolumeNo,
          @FolioNo,
          @StatusOfInstrument,
          @RegistrationDate,
          @NameOfTransferee,
          @AddressOfTransferee,
          @OccupationOfTransferee,
          @Consideration,
          @ConsiderationRemark,
          @Currency,
          @AreaLotNoBeingTransferred,
          @DPNo,
          @NewVolumes,
          @NewFolios,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("PowerOfSaleInstrumentNo", sql.Int, PowerOfSaleInstrumentNo)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("StatusOfInstrument", sql.VarChar(25), StatusOfInstrument || null)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("NameOfTransferee", sql.VarChar(255), NameOfTransferee || null)
      .input(
        "AddressOfTransferee",
        sql.VarChar(255),
        AddressOfTransferee || null
      )
      .input(
        "OccupationOfTransferee",
        sql.VarChar(255),
        OccupationOfTransferee || null
      )
      .input("Consideration", sql.Decimal, Consideration || null)
      .input("ConsiderationRemark", sql.Text, ConsiderationRemark || null)
      .input("Currency", sql.VarChar(3), Currency || null)
      .input(
        "AreaLotNoBeingTransferred",
        sql.Text,
        AreaLotNoBeingTransferred || null
      )
      .input("DPNo", sql.VarChar(255), DPNo || null)
      .input("NewVolumes", sql.Text, NewVolumes || null)
      .input("NewFolios", sql.Text, NewFolios || null)
      .input("Verified", sql.VarChar(255), Verified)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertPowerOfSaleTransferData:", error);
    throw new Error(
      "An error occurred while inserting data into the PowerOfSaleTransfer table."
    );
  }
};

export const insertTransferOfPartData = async (data) => {
  const {
    TransferOfPartInstrumentNo,
    VolumeNo,
    FolioNo,
    StatusOfInstrument,
    RegistrationDate,
    NameOfTransferee,
    AddressOfTransferee,
    OccupationOfTransferee,
    DateOfBirthOfTransferee,
    ActOfIncorporationOfTransferee,
    TenancyType,
    Consideration,
    ConsiderationRemark,
    Currency,
    AdditionalRestrictiveCovenants,
    AreaLotNoBeingTransferred,
    DPNo,
    NewVolumes,
    NewFolios,
    Remarks,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO TransferOfPart (
          TransferOfPartInstrumentNo,
          VolumeNo,
          FolioNo,
          StatusOfInstrument,
          RegistrationDate,
          NameOfTransferee,
          AddressOfTransferee,
          OccupationOfTransferee,
          DateOfBirthOfTransferee,
          ActOfIncorporationOfTransferee,
          TenancyType,
          Consideration,
          ConsiderationRemark,
          Currency,
          AdditionalRestrictiveCovenants,
          AreaLotNoBeingTransferred,
          DPNo,
          NewVolumes,
          NewFolios,
          Remarks,
          Verified,
          EvaluationComment
        )
        VALUES (
          @TransferOfPartInstrumentNo,
          @VolumeNo,
          @FolioNo,
          @StatusOfInstrument,
          @RegistrationDate,
          @NameOfTransferee,
          @AddressOfTransferee,
          @OccupationOfTransferee,
          @DateOfBirthOfTransferee,
          @ActOfIncorporationOfTransferee,
          @TenancyType,
          @Consideration,
          @ConsiderationRemark,
          @Currency,
          @AdditionalRestrictiveCovenants,
          @AreaLotNoBeingTransferred,
          @DPNo,
          @NewVolumes,
          @NewFolios,
          @Remarks,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("TransferOfPartInstrumentNo", sql.Int, TransferOfPartInstrumentNo)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("StatusOfInstrument", sql.VarChar(25), StatusOfInstrument || null)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("NameOfTransferee", sql.VarChar(255), NameOfTransferee || null)
      .input(
        "AddressOfTransferee",
        sql.VarChar(255),
        AddressOfTransferee || null
      )
      .input(
        "OccupationOfTransferee",
        sql.VarChar(255),
        OccupationOfTransferee || null
      )
      .input(
        "DateOfBirthOfTransferee",
        sql.Date,
        DateOfBirthOfTransferee || null
      )
      .input(
        "ActOfIncorporationOfTransferee",
        sql.Text,
        ActOfIncorporationOfTransferee || null
      )
      .input("TenancyType", sql.VarChar(255), TenancyType || null)
      .input("Consideration", sql.Decimal(10, 2), Consideration || null)
      .input("ConsiderationRemark", sql.Text, ConsiderationRemark || null)
      .input("Currency", sql.VarChar(3), Currency || null)
      .input(
        "AdditionalRestrictiveCovenants",
        sql.Text,
        AdditionalRestrictiveCovenants || null
      )
      .input(
        "AreaLotNoBeingTransferred",
        sql.Text,
        AreaLotNoBeingTransferred || null
      )
      .input("DPNo", sql.VarChar(255), DPNo || null)
      .input("NewVolumes", sql.Text, NewVolumes || null)
      .input("NewFolios", sql.Text, NewFolios || null)
      .input("Remarks", sql.Text, Remarks || null)
      .input("Verified", sql.VarChar(255), Verified)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertTransferOfPartData:", error);
    throw new Error(
      "An error occurred while inserting data into the TransferOfPart table."
    );
  }
};

export const insertTransferOfMortgageData = async (data) => {
  console.log(data);
  const {
    TransferOfMortgageNo,
    VolumeNo,
    FolioNo,
    StatusOfInstrument,
    RegistrationDate,
    MortgageInstrumentNo,
    NameOfTransferee,
    AddressOfTransferee,
    OccupationOfTransferee,
    ActOfIncorporationOfTransferee,
    Consideration,
    Currency,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO TransferOfMortgage (
          TransferOfMortgageNo,
          VolumeNo,
          FolioNo,
          StatusOfInstrument,
          RegistrationDate,
          MortgageInstrumentNo,
          NameOfTransferee,
          AddressOfTransferee,
          OccupationOfTransferee,
          ActOfIncorporationOfTransferee,
          Consideration,
          Currency,
          Verified,
          EvaluationComment
        )
        VALUES (
          @TransferOfMortgageNo,
          @VolumeNo,
          @FolioNo,
          @StatusOfInstrument,
          @RegistrationDate,
          @MortgageInstrumentNo,
          @NameOfTransferee,
          @AddressOfTransferee,
          @OccupationOfTransferee,
          @ActOfIncorporationOfTransferee,
          @Consideration,
          @Currency,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("TransferOfMortgageNo", sql.Int, TransferOfMortgageNo)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("StatusOfInstrument", sql.VarChar(25), StatusOfInstrument || null)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input(
        "MortgageInstrumentNo",
        sql.VarChar(255),
        MortgageInstrumentNo || null
      )
      .input("NameOfTransferee", sql.VarChar(45), NameOfTransferee || null)
      .input(
        "AddressOfTransferee",
        sql.VarChar(255),
        AddressOfTransferee || null
      )
      .input(
        "OccupationOfTransferee",
        sql.VarChar(45),
        OccupationOfTransferee || null
      )
      .input(
        "ActOfIncorporationOfTransferee",
        sql.Text,
        ActOfIncorporationOfTransferee || null
      )
      .input("Consideration", sql.Decimal(10, 2), Consideration || null)
      .input("Currency", sql.VarChar(3), Currency || null)
      .input("Verified", sql.VarChar(255), Verified)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertTransferOfMortgageData:", error);
    throw new Error(
      "An error occurred while inserting data into the TransferOfMortgage table."
    );
  }
};

export const insertTransferOfLeaseData = async (data) => {
  const {
    TransferOfLeaseNo,
    VolumeNo,
    FolioNo,
    StatusOfInstrument,
    RegistrationDate,
    LeaseInstrumentNo,
    NameOfTransferee,
    AddressOfTransferee,
    OccupationOfTransferee,
    ActOfIncorporationOfTransferee,
    TenancyType,
    Consideration,
    Currency,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO TransferOfLease (
          TransferOfLeaseNo,
          VolumeNo,
          FolioNo,
          StatusOfInstrument,
          RegistrationDate,
          LeaseInstrumentNo,
          NameOfTransferee,
          AddressOfTransferee,
          OccupationOfTransferee,
          ActOfIncorporationOfTransferee,
          TenancyType,
          Consideration,
          Currency,
          Verified,
          EvaluationComment
        )
        VALUES (
          @TransferOfLeaseNo,
          @VolumeNo,
          @FolioNo,
          @StatusOfInstrument,
          @RegistrationDate,
          @LeaseInstrumentNo,
          @NameOfTransferee,
          @AddressOfTransferee,
          @OccupationOfTransferee,
          @ActOfIncorporationOfTransferee,
          @TenancyType,
          @Consideration,
          @Currency,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("TransferOfLeaseNo", sql.Int, TransferOfLeaseNo)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("StatusOfInstrument", sql.VarChar(25), StatusOfInstrument || null)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("LeaseInstrumentNo", sql.Text, LeaseInstrumentNo || null)
      .input("NameOfTransferee", sql.VarChar(45), NameOfTransferee || null)
      .input(
        "AddressOfTransferee",
        sql.VarChar(255),
        AddressOfTransferee || null
      )
      .input(
        "OccupationOfTransferee",
        sql.VarChar(45),
        OccupationOfTransferee || null
      )
      .input(
        "ActOfIncorporationOfTransferee",
        sql.Text,
        ActOfIncorporationOfTransferee || null
      )
      .input("TenancyType", sql.VarChar(255), TenancyType || null)
      .input("Consideration", sql.Decimal(10, 2), Consideration || null)
      .input("Currency", sql.VarChar(3), Currency || null)
      .input("Verified", sql.VarChar(255), Verified)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertTransferOfLeaseData:", error);
    throw new Error(
      "An error occurred while inserting data into the TransferOfLease table."
    );
  }
};

export const insertTransmissionApplicationData = async (data) => {
  const {
    TransmissionApplicationNo,
    VolumeNo,
    FolioNo,
    StatusOfInstrument,
    RegistrationDate,
    NameOfDeceased,
    TypeOfGrant,
    EffectiveDateOfGrant,
    NameOfPersonalRepresentative,
    AddressOfPersonalRepresentative,
    OccupationOfPersonalRepresentative,
    ActOfIncorporationOfPersonalRepresentative,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO TransmissionApplication (
          TransmissionApplicationNo,
          VolumeNo,
          FolioNo,
          StatusOfInstrument,
          RegistrationDate,
          NameOfDeceased,
          TypeOfGrant,
          EffectiveDateOfGrant,
          NameOfPersonalRepresentative,
          AddressOfPersonalRepresentative,
          OccupationOfPersonalRepresentative,
          ActOfIncorporationOfPersonalRepresentative,
          Verified,
          EvaluationComment
        )
        VALUES (
          @TransmissionApplicationNo,
          @VolumeNo,
          @FolioNo,
          @StatusOfInstrument,
          @RegistrationDate,
          @NameOfDeceased,
          @TypeOfGrant,
          @EffectiveDateOfGrant,
          @NameOfPersonalRepresentative,
          @AddressOfPersonalRepresentative,
          @OccupationOfPersonalRepresentative,
          @ActOfIncorporationOfPersonalRepresentative,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("TransmissionApplicationNo", sql.Int, TransmissionApplicationNo)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("StatusOfInstrument", sql.VarChar(25), StatusOfInstrument || null)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("NameOfDeceased", sql.Text, NameOfDeceased || null)
      .input("TypeOfGrant", sql.Text, TypeOfGrant || null)
      .input("EffectiveDateOfGrant", sql.Date, EffectiveDateOfGrant || null)
      .input(
        "NameOfPersonalRepresentative",
        sql.VarChar(255),
        NameOfPersonalRepresentative || null
      )
      .input(
        "AddressOfPersonalRepresentative",
        sql.VarChar(255),
        AddressOfPersonalRepresentative || null
      )
      .input(
        "OccupationOfPersonalRepresentative",
        sql.VarChar(255),
        OccupationOfPersonalRepresentative || null
      )
      .input(
        "ActOfIncorporationOfPersonalRepresentative",
        sql.Text,
        ActOfIncorporationOfPersonalRepresentative || null
      )
      .input("Verified", sql.VarChar(255), Verified)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertTransmissionApplicationData:", error);
    throw new Error(
      "An error occurred while inserting data into the TransmissionApplication table."
    );
  }
};

export const insertDischargeOfMortgageData = async (data) => {
  const {
    DischargeNo,
    VolumeNo,
    FolioNo,
    RegistrationDate,
    MortgageNos,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO DischargeOfMortgage (
          DischargeNo,
          VolumeNo,
          FolioNo,
          RegistrationDate,
          MortgageNos,
          Verified,
          EvaluationComment
        )
        VALUES (
          @DischargeNo,
          @VolumeNo,
          @FolioNo,
          @RegistrationDate,
          @MortgageNos,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("DischargeNo", sql.Int, DischargeNo)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("MortgageNos", sql.VarChar(255), MortgageNos || null)
      .input("Verified", sql.VarChar(255), Verified || null)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertDischargeOfMortgageData:", error);
    throw new Error(
      "An error occurred while inserting data into the DischargeOfMortgage table."
    );
  }
};

export const insertPartialDischargeOfMortgageData = async (data) => {
  const {
    VolumeNo,
    FolioNo,
    RegistrationDate,
    MortgageNos,
    MoniesDischarged,
    PartOfLandDischarged,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO PartialDischargeOfMortgage (
          VolumeNo,
          FolioNo,
          RegistrationDate,
          MortgageNos,
          MoniesDischarged,
          PartOfLandDischarged,
          Verified,
          EvaluationComment
        )
        VALUES (
          @VolumeNo,
          @FolioNo,
          @RegistrationDate,
          @MortgageNos,
          @MoniesDischarged,
          @PartOfLandDischarged,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("MortgageNos", sql.VarChar(255), MortgageNos || null)
      .input("MoniesDischarged", sql.VarChar(255), MoniesDischarged || null)
      .input("PartOfLandDischarged", sql.Text, PartOfLandDischarged || null)
      .input("Verified", sql.VarChar(255), Verified || null)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertPartialDischargeOfMortgageData:", error);
    throw new Error(
      "An error occurred while inserting data into the PartialDischargeOfMortgage table."
    );
  }
};

export const insertApplicationToNoteDeathData = async (data) => {
  const {
    NoteDeathInstrumentNo,
    VolumeNo,
    FolioNo,
    StatusOfInstrument,
    RegistrationDate,
    NameOfDeceased,
    DateOfDeath,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO ApplicationToNoteDeath (
          NoteDeathInstrumentNo,
          VolumeNo,
          FolioNo,
          StatusOfInstrument,
          RegistrationDate,
          NameOfDeceased,
          DateOfDeath,
          Verified,
          EvaluationComment
        )
        VALUES (
          @NoteDeathInstrumentNo,
          @VolumeNo,
          @FolioNo,
          @StatusOfInstrument,
          @RegistrationDate,
          @NameOfDeceased,
          @DateOfDeath,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("NoteDeathInstrumentNo", sql.Int, NoteDeathInstrumentNo)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("StatusOfInstrument", sql.VarChar(25), StatusOfInstrument || null)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("NameOfDeceased", sql.Text, NameOfDeceased || null)
      .input("DateOfDeath", sql.Date, DateOfDeath || null)
      .input("Verified", sql.VarChar(25), Verified)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertApplicationToNoteDeathData:", error);
    throw new Error(
      "An error occurred while inserting data into the ApplicationToNoteDeath table."
    );
  }
};

export const insertAdversePossessionData = async (data) => {
  const {
    AdversePossessionInstrumentNo,
    VolumeNo,
    FolioNo,
    RegistrationDate,
    AreaOrLotNoBeingVested,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO AdversePossession (
          AdversePossessionInstrumentNo,
          VolumeNo,
          FolioNo,
          RegistrationDate,
          AreaOrLotNoBeingVested,
          Verified,
          EvaluationComment
        )
        VALUES (
          @AdversePossessionInstrumentNo,
          @VolumeNo,
          @FolioNo,
          @RegistrationDate,
          @AreaOrLotNoBeingVested,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input(
        "AdversePossessionInstrumentNo",
        sql.Int,
        AdversePossessionInstrumentNo
      )
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("AreaOrLotNoBeingVested", sql.Text, AreaOrLotNoBeingVested || null)
      .input("Verified", sql.VarChar(25), Verified)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertAdversePossessionData:", error);
    throw new Error(
      "An error occurred while inserting data into the AdversePossession table."
    );
  }
};

export const insertApplicationToAmendData = async (data) => {
  const {
    ApplicationToAmendInstrumentNo,
    VolumeNo,
    FolioNo,
    RegistrationDate,
    NatureOfAmendment,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO ApplicationToAmend (
          ApplicationToAmendInstrumentNo,
          VolumeNo,
          FolioNo,
          RegistrationDate,
          NatureOfAmendment,
          Verified,
          EvaluationComment
        )
        VALUES (
          @ApplicationToAmendInstrumentNo,
          @VolumeNo,
          @FolioNo,
          @RegistrationDate,
          @NatureOfAmendment,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input(
        "ApplicationToAmendInstrumentNo",
        sql.Int,
        ApplicationToAmendInstrumentNo
      )
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("NatureOfAmendment", sql.Text, NatureOfAmendment || null)
      .input("Verified", sql.VarChar(255), Verified)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertApplicationToAmendData:", error);
    throw new Error(
      "An error occurred while inserting data into the ApplicationToAmend table."
    );
  }
};

export const insertOneHoldingData = async (data) => {
  const {
    OneHoldingInstrumentNo,
    VolumeNo,
    FolioNo,
    OtherVolume,
    OtherFolio,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO OneHolding (
          OneHoldingInstrumentNo,
          VolumeNo,
          FolioNo,
          OtherVolume,
          OtherFolio,
          Verified,
          EvaluationComment
        )
        VALUES (
          @OneHoldingInstrumentNo,
          @VolumeNo,
          @FolioNo,
          @OtherVolume,
          @OtherFolio,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("OneHoldingInstrumentNo", sql.Int, OneHoldingInstrumentNo)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("OtherVolume", sql.VarChar(255), OtherVolume)
      .input("OtherFolio", sql.VarChar(255), OtherFolio)
      .input("Verified", sql.VarChar(255), Verified)
      .input("EvaluationComment", sql.Text, EvaluationComment)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertOneHoldingData:", error);
    throw new Error(
      `  "An error occurred while inserting data into the OneHolding table.",`
    );
  }
};

export const insertMiscellaneousData = async (data) => {
  const {
    MiscellaneousNo,
    VolumeNo,
    FolioNo,
    Type,
    RegistrationDate,
    Consideration,
    Currency,
    Description,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO Miscellaneous (
          MiscellaneousNo,
          VolumeNo,
          FolioNo,
          Type,
          RegistrationDate,
          Consideration,
          Currency,
          Description,
          Verified,
          EvaluationComment
        )
        VALUES (
          @MiscellaneousNo,
          @VolumeNo,
          @FolioNo,
          @Type,
          @RegistrationDate,
          @Consideration,
          @Currency,
          @Description,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("MiscellaneousNo", sql.Int, MiscellaneousNo)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("Type", sql.Text, Type || null)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("Consideration", sql.Decimal(10, 2), Consideration || null)
      .input("Currency", sql.VarChar(3), Currency || null)
      .input("Description", sql.Text, Description || null)
      .input("Verified", sql.VarChar(255), Verified)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertMiscellaneousData:", error);
    throw new Error(
      `An error occurred while inserting data into the Miscellaneous table: ${error.message}`
    );
  }
};

export const insertCaveatData = async (data) => {
  const {
    CaveatId,
    CaveatInstrumentNo,
    VolumeNo,
    FolioNo,
    CaveatStatus,
    Caveator,
    RegistrationDate,
    InterestClaimed,
    Verified,
    EvaluationComment,
  } = data;

  try {
    let pool = await connect(configg);
    const sqlStatement = `
        INSERT INTO Caveat (
          CaveatId,
          CaveatInstrumentNo,
          VolumeNo,
          FolioNo,
          CaveatStatus,
          Caveator,
          RegistrationDate,
          InterestClaimed,
          Verified,
          EvaluationComment
        )
        VALUES (
          @CaveatId,
          @CaveatInstrumentNo,
          @VolumeNo,
          @FolioNo,
          @CaveatStatus,
          @Caveator,
          @RegistrationDate,
          @InterestClaimed,
          @Verified,
          @EvaluationComment
        )
      `;

    const result = await pool
      .request()
      .input("CaveatId", sql.Int, CaveatId)
      .input("CaveatInstrumentNo", sql.Int, CaveatInstrumentNo || null)
      .input("VolumeNo", sql.Int, VolumeNo)
      .input("FolioNo", sql.Int, FolioNo)
      .input("CaveatStatus", sql.VarChar(20), CaveatStatus || null)
      .input("Caveator", sql.VarChar(255), Caveator || null)
      .input("RegistrationDate", sql.Date, RegistrationDate || null)
      .input("InterestClaimed", sql.Text, InterestClaimed || null)
      .input("Verified", sql.VarChar(255), Verified)
      .input("EvaluationComment", sql.Text, EvaluationComment || null)
      .query(sqlStatement);

    return result.recordset;
  } catch (error) {
    console.error("Error in insertCaveatData:", error);
    throw new Error(
      `An error occurred while inserting data into the Caveat table`
    );
  }
};

export const getTableData = async (data) => {
  const { TableColumn, TableName, TableValue } = data;

  try {
    let pool = await connect(configg);
    let sqlStatement = `SELECT * FROM ${TableName} WHERE ${TableColumn} = @TableValue`;

    const result = await pool
      .request()
      .input("TableValue", sql.Int, TableValue)
      .query(sqlStatement);
    return result.recordset.length > 0 ? result.recordset[0] : null;
  } catch (error) {
    throw new Error("An error occurred while retrieving data.");
  }
};
