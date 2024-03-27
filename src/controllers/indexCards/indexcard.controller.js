import {
  CheckAllVerfied,
  CreateIndexAttribute,
  GetAllIndexAttributes,
  GetIndexAttribute,
  UpdateIndexAttribute,
  UpdateIndexCardComment,
  UpdateIndexCardStage,
  UpdateIndexCardValue,
  UpdateIndexCardVerified,
  getIndexCardDetails,
} from "../../services/indexCards/indexcard.service.js";

const convertProperties = (inputArray) => {
  const convertedObject = {};
  inputArray.forEach((item) => {
    const attributeName = item.AttributeName;
    convertedObject[attributeName] = item;
  });
  return convertedObject;
};

export const updateIndexVerfiedHandler = async (req, res, next) => {
  try {
    await UpdateIndexCardVerified(req.body);
    res.status(200).send({ message: "updated successfullyy!!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const updateIndexCommentHandler = async (req, res, next) => {
  try {
    await UpdateIndexCardComment(req.body);
    res.status(200).send({ message: "Comment successfully!!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getIndexCardDetail = async (req, res, next) => {
  try {
    const { ApplicationNo } = req.body;
    if (!ApplicationNo) {
      return res
        .status(400)
        .json({ error: "ApplicationNo is required for the search." });
    }

    const response = await getIndexCardDetails(req.body);
    res.send(response);
  } catch (error) {
    console.error("Error in getIndexCardDetail:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const indexAttributeStatusHandler = async (req, res, next) => {
  const { AttributeStatus } = req.body;
  const statusInput = {
    ...req.body,
    AttributeUser: req.user,
    AttributeValue: AttributeStatus,
    AttributeColumn: "AttributeStatus",
  };

  try {
    const existProperty = await GetIndexAttribute(statusInput);
    let propertyResponse;

    if (existProperty) {
      propertyResponse = await UpdateIndexAttribute(statusInput);
    } else {
      propertyResponse = await CreateIndexAttribute(statusInput);
    }

    res.send(propertyResponse);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const indexAttributeEditHandler = async (req, res, next) => {
  const { editedValue } = req.body;

  const edittInput = {
    ...req.body,
    AttributeUser: req.user,
    AttributeValue: 1,
    AttributeColumn: "AttributeCountNo",
    editedValue: editedValue,
  };

  try {
    const existProperty = await GetIndexAttribute(edittInput);
    let propertyResponse;

    if (existProperty) {
      propertyResponse = await UpdateIndexAttribute({
        ...edittInput,
        AttributeValue: existProperty.AttributeCountNo + 1,
      });
    } else {
      propertyResponse = await CreateIndexAttribute(edittInput);
    }
    await UpdateTableData(edittInput);
    res.send(propertyResponse);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getIndexAttributesHandler = async (req, res, next) => {
  const attributeInput = {
    ...req.body,
    AttributeUser: req.user,
  };

  try {
    const propertyResponse = await GetAllIndexAttributes(attributeInput);
    const updatedProperty = convertProperties(propertyResponse);
    res.send(updatedProperty);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const checkAllVerifiedHandler = async (req, res, next) => {
  try {
    await CheckAllVerfied(req.body);
    res.status(200).send({ message: "updated checked table successfullyy!!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateIndexStageHandler = async (req, res, next) => {
  try {
    await UpdateIndexCardStage(req.body);
    res.status(200).send({ message: "updated stage successfullyy!!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateIndexCardValueHandler = async (req, res, next) => {
  try {
    await UpdateIndexCardValue(req.body);
    res
      .status(200)
      .send({ message: "updated indexCard Value successfullyy!!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
