import {
  UpdateAdminIndexCardStage,
  UpdateAdminLandDataStage,
  getPendingIndexCard,
  getPendingLandData,
} from "../../services/admin/admin.services.js";

const convertProperties = (inputArray, colName) => {
  const convertedObject = {};
  inputArray.forEach((item) => {
    const attributeName = item[colName];
    convertedObject[attributeName] = item;
  });
  return convertedObject;
};

export const getPendingIndexCardHandler = async (req, res, next) => {
  const role = req.dept;
  const { pageSize, pageOffset } = req.params;
  try {
    const response = await getPendingIndexCard(role, pageSize, pageOffset);
    const updateResponse = convertProperties(response, "ApplicationNo");
    res.send(updateResponse);
  } catch (error) {
    console.error("Error in getIndexCardDetail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPendingLandDataHandler = async (req, res, next) => {
  const role = req.dept;
  try {
    const response = await getPendingLandData(role);
    const updateResponse = convertProperties(response, "VolumeNo");
    res.send(updateResponse);
  } catch (error) {
    console.error("Error in getIndexCardDetail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAdminIndexStageHandler = async (req, res, next) => {
  try {
    await UpdateAdminIndexCardStage(req.body);
    res.status(200).send({ message: "updated stage successfullyy!!" });
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};

export const updateAdminLandStageHandler = async (req, res, next) => {
  try {
    await UpdateAdminLandDataStage(req.body);
    res.status(200).send({ message: "updated stage successfullyy!!" });
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};
