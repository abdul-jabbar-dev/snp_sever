import {
  getTableData,
  insertAdversePossessionData,
  insertApplicationToAmendData,
  insertApplicationToNoteDeathData,
  insertCaveatData,
  insertDischargeOfMortgageData,
  insertLeaseData,
  insertMiscellaneousData,
  insertMortgageData,
  insertOneHoldingData,
  insertPartialDischargeOfMortgageData,
  insertPowerOfSaleTransferData,
  insertSurrenderOfLeaseData,
  insertTransferData,
  insertTransferOfLeaseData,
  insertTransferOfMortgageData,
  insertTransferOfPartData,
  insertTransmissionApplicationData,
} from "../../services/lands/form.service.js";

export const TransferHandler = async (req, res) => {
  try {
    const { TransferInstrumentNo } = req.body;

    const newData = {
      TableColumn: "TransferInstrumentNo",
      TableName: "Transfer",
      TableValue: TransferInstrumentNo,
    };

    const existData = await getTableData(newData);
    if (existData) {
      return res.status(409).json({
        error:
          "PowerOfSaleTransfer with provided PowerOfSaleInstrumentNo already exists.",
      });
    }

    await insertTransferData(req.body);
    res.status(200).json({ message: "Transfer data inserted successfully!!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while inserting transfer data." });
  }
};

export const MortgageDataHandler = async (req, res) => {
  try {
    const { MortgageInstrumentNo } = req.body;

    const newData = {
      TableColumn: "MortgageInstrumentNo",
      TableName: "Mortgage",
      TableValue: MortgageInstrumentNo,
    };

    const existData = await getTableData(newData);
    if (existData) {
      return res.status(409).json({
        error:
          "PowerOfSaleTransfer with provided PowerOfSaleInstrumentNo already exists.",
      });
    }

    await insertMortgageData(req.body);
    res
      .status(200)
      .json({ message: "MortgageData data inserted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while inserting MortgageData data." });
  }
};

export const LeaseDataHandler = async (req, res) => {
  try {
    await insertLeaseData(req.body);
    res.status(200).json({ message: "LeaseData data inserted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while inserting LeaseData data." });
  }
};

export const SurrenderOfLeaseDataHandler = async (req, res) => {
  try {
    await insertSurrenderOfLeaseData(req.body);
    res
      .status(200)
      .json({ message: "SurrenderOfLeaseData data inserted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while inserting SurrenderOfLeaseData data.",
    });
  }
};

export const PowerOfSaleTransferDataHandler = async (req, res) => {
  try {
    const { PowerOfSaleInstrumentNo } = req.body;

    const newData = {
      TableColumn: "PowerOfSaleInstrumentNo",
      TableName: "PowerOfSaleTransfer",
      TableValue: PowerOfSaleInstrumentNo,
    };

    const existData = await getTableData(newData);
    if (existData) {
      return res.status(409).json({
        error:
          "PowerOfSaleTransfer with provided PowerOfSaleInstrumentNo already exists.",
      });
    }

    await insertPowerOfSaleTransferData(req.body);
    res
      .status(200)
      .json({ message: "PowerOfSaleTransfer data inserted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while inserting PowerOfSaleTransfer data.",
    });
  }
};

export const TransferOfPartDataHandler = async (req, res) => {
  const { TransferOfPartInstrumentNo } = req.body;

  const newData = {
    TableColumn: "TransferOfPartInstrumentNo",
    TableName: "TransferOfPart",
    TableValue: TransferOfPartInstrumentNo,
  };

  const existData = await getTableData(newData);
  if (existData) {
    return res.status(409).json({
      error:
        "PowerOfSaleTransfer with provided PowerOfSaleInstrumentNo already exists.",
    });
  }

  try {
    await insertTransferOfPartData(req.body);
    res
      .status(200)
      .json({ message: "TransferOfPart data inserted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while inserting TransferOfPart data.",
    });
  }
};

export const TransferOfMortgageDataHandler = async (req, res) => {
  try {
    const { TransferOfMortgageNo } = req.body;

    const newData = {
      TableColumn: "TransferOfMortgageNo",
      TableName: "TransferOfMortgage",
      TableValue: TransferOfMortgageNo,
    };

    const existData = await getTableData(newData);
    console.log({ existData });

    if (existData) {
      return res.status(409).json({
        error:
          "PowerOfSaleTransfer with provided PowerOfSaleInstrumentNo already exists.",
      });
    }

    await insertTransferOfMortgageData(req.body);
    res
      .status(200)
      .json({ message: "TransferOfMortgageData inserted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while inserting TransferOfMortgageData.",
    });
  }
};

export const TransferOfLeaseDataHandler = async (req, res) => {
  try {
    const { TransferOfLeaseNo } = req.body;

    const newData = {
      TableColumn: "TransferOfLeaseNo",
      TableName: "TransferOfLease",
      TableValue: TransferOfLeaseNo,
    };

    const existData = await getTableData(newData);

    if (existData) {
      return res.status(409).json({
        error:
          "PowerOfSaleTransfer with provided PowerOfSaleInstrumentNo already exists.",
      });
    }
    await insertTransferOfLeaseData(req.body);
    res
      .status(200)
      .json({ message: "TransferOfLease data inserted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while inserting TransferOfLease data.",
    });
  }
};

export const TransmissionApplicationDataHandler = async (req, res) => {
  try {
    const { TransmissionApplicationNo } = req.body;

    const newData = {
      TableColumn: "TransmissionApplicationNo",
      TableName: "TransmissionApplication",
      TableValue: TransmissionApplicationNo,
    };

    const existData = await getTableData(newData);

    if (existData) {
      return res.status(409).json({
        error:
          "PowerOfSaleTransfer with provided PowerOfSaleInstrumentNo already exists.",
      });
    }

    await insertTransmissionApplicationData(req.body);
    res
      .status(200)
      .json({ message: "TransferOfLease data inserted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while inserting TransferOfLease data.",
    });
  }
};

export const DischargeOfMortgageDataHandler = async (req, res) => {
  try {
    const { DischargeNo } = req.body;

    const newData = {
      TableColumn: "DischargeNo",
      TableName: "DischargeOfMortgage",
      TableValue: DischargeNo,
    };

    const existData = await getTableData(newData);

    if (existData) {
      return res.status(409).json({
        error:
          "PowerOfSaleTransfer with provided PowerOfSaleInstrumentNo already exists.",
      });
    }

    await insertDischargeOfMortgageData(req.body);
    res
      .status(200)
      .json({ message: "DischargeOfMortgage data inserted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while inserting DischargeOfMortgage data.",
    });
  }
};

export const PartialDischargeOfMortgageDataHandler = async (req, res) => {
  try {
    await insertPartialDischargeOfMortgageData(req.body);
    res.status(200).json({
      message: "PartialDischargeOfMortgage data inserted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error:
        "An error occurred while inserting PartialDischargeOfMortgage data.",
    });
  }
};

export const ApplicationToNoteDeathDataHandler = async (req, res) => {
  try {
    const { NoteDeathInstrumentNo } = req.body;

    const newData = {
      TableColumn: "NoteDeathInstrumentNo",
      TableName: "ApplicationToNoteDeath",
      TableValue: NoteDeathInstrumentNo,
    };

    const existData = await getTableData(newData);

    if (existData) {
      return res.status(409).json({
        error:
          "PowerOfSaleTransfer with provided PowerOfSaleInstrumentNo already exists.",
      });
    }

    await insertApplicationToNoteDeathData(req.body);
    res.status(200).json({
      message: "ApplicationToNoteDeath data inserted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while inserting ApplicationToNoteDeath data.",
    });
  }
};

export const AdversePossessionDataHandler = async (req, res) => {
  try {
    const { AdversePossessionInstrumentNo } = req.body;

    const newData = {
      TableColumn: "AdversePossessionInstrumentNo",
      TableName: "AdversePossession",
      TableValue: AdversePossessionInstrumentNo,
    };

    const existData = await getTableData(newData);

    if (existData) {
      return res.status(409).json({
        error:
          "PowerOfSaleTransfer with provided PowerOfSaleInstrumentNo already exists.",
      });
    }

    await insertAdversePossessionData(req.body);
    res.status(200).json({
      message: "AdversePossession data inserted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while inserting AdversePossession data.",
    });
  }
};

export const ApplicationToAmendDataHandler = async (req, res) => {
  try {
    const { ApplicationToAmendInstrumentNo } = req.body;

    const newData = {
      TableColumn: "ApplicationToAmendInstrumentNo",
      TableName: "ApplicationToAmend",
      TableValue: ApplicationToAmendInstrumentNo,
    };

    const existData = await getTableData(newData);

    if (existData) {
      return res.status(409).json({
        error:
          "PowerOfSaleTransfer with provided PowerOfSaleInstrumentNo already exists.",
      });
    }

    await insertApplicationToAmendData(req.body);
    res.status(200).json({
      message: "ApplicationToAmend data inserted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while inserting ApplicationToAmend data.",
    });
  }
};

export const OneHoldingDataHandler = async (req, res) => {
  try {
    await insertOneHoldingData(req.body);
    res.status(200).json({
      message: "OneHolding data inserted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while inserting OneHolding data.",
    });
  }
};

export const MiscellaneousDataHandler = async (req, res) => {
  try {
    const { MiscellaneousNo } = req.body;

    const newData = {
      TableColumn: "MiscellaneousNo",
      TableName: "Miscellaneous",
      TableValue: MiscellaneousNo,
    };

    const existData = await getTableData(newData);
    if (existData) {
      return res.status(409).json({
        error: "MiscellaneousNo with provided MiscellaneousNo already exists.",
      });
    }

    await insertMiscellaneousData(req.body);
    res.status(200).json({
      message: "insertMiscellaneousData data inserted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while inserting insertMiscellaneousData data.",
    });
  }
};

export const CaveatDataDataHandler = async (req, res) => {
  try {
    const { CaveatId } = req.body;

    const newData = {
      TableColumn: "CaveatId",
      TableName: "Caveat",
      TableValue: CaveatId,
    };
    const existData = await getTableData(newData);

    if (existData) {
      return res.status(409).json({
        error: "Caveat with provided CaveatId already exists.",
      });
    }

    await insertCaveatData(req.body);
    return res.status(200).json({
      message: "Caveat data inserted successfully",
    });
  } catch (error) {
    console.error("Error in CaveatDataDataHandler:", error);
    return res.status(500).json({
      error: "An error occurred while inserting Caveat data.",
    });
  }
};
