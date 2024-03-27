import {
  CheckedPropertiesAll,
  CreateAttribute,
  GetAttribute,
  GetProperties,
  GetPropertiesTableData,
  UpdateAttribute,
  UpdateCheckedTable,
  UpdateStage,
  UpdateTableData,
  createOrUpdateTableComment,
  getTableComment,
} from "../../services/lands/attribute.service.js";

const convertProperties = (inputArray) => {
  const convertedObject = {};
  inputArray.forEach((item) => {
    const attributeName = item.AttributeName;
    convertedObject[attributeName] = item;
  });
  return convertedObject;
};

export const createOrUpdateTableCommentHandler = async (req, res, next) => {
  try {
    await createOrUpdateTableComment(req.body);
    const result = await getTableComment(req.body);
    res.send(result);
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};

export const attributeStatusHandler = async (req, res, next) => {
  const { AttributeStatus } = req.body;
  const statusInput = {
    ...req.body,
    AttributeUser: req.user,
    AttributeValue: AttributeStatus,
    AttributeColumn: "AttributeStatus",
  };

  try {
    const existProperty = await GetAttribute(statusInput);
    let propertyResponse;

    if (existProperty) {
      propertyResponse = await UpdateAttribute(statusInput);
    } else {
      propertyResponse = await CreateAttribute(statusInput);
    }

    res.send(propertyResponse);
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};

export const attributeCommentHandler = async (req, res, next) => {
  const { AttributeCommentValue } = req.body;
  const commentInput = {
    ...req.body,
    AttributeUser: req.user,
    AttributeValue: AttributeCommentValue,
    AttributeColumn: "AttributeCommentValue",
  };
  try {
    const existProperty = await GetAttribute(commentInput);
    let propertyResponse;

    if (existProperty) {
      propertyResponse = await UpdateAttribute(commentInput);
    } else {
      propertyResponse = await CreateAttribute(commentInput);
    }

    res.send(propertyResponse);
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};

export const attributeEditHandler = async (req, res, next) => {
  const { editedValue } = req.body;
  console.log(req.body);

  const edittInput = {
    ...req.body,
    AttributeUser: req.user,
    AttributeValue: 1,
    AttributeColumn: "AttributeCountNo",
    editedValue: editedValue,
  };

  try {
    const existProperty = await GetAttribute(edittInput);
    let propertyResponse;

    if (existProperty) {
      propertyResponse = await UpdateAttribute({
        ...edittInput,
        AttributeValue: existProperty.AttributeCountNo + 1,
      });
    } else {
      propertyResponse = await CreateAttribute(edittInput);
    }
    await UpdateTableData(edittInput);
    res.send(propertyResponse);
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};

export const getPropertyHandler = async (req, res, next) => {
  console.log(req.body);
  const attributeInput = {
    ...req.body,
    AttributeUser: req.user,
  };

  try {
    const tableData = await GetPropertiesTableData(attributeInput);
    const propertyResponse = await GetProperties(attributeInput);
    const updatedProperty = convertProperties(propertyResponse);
    res.send({ updatedProperty, tableData });
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};

export const attributeCheckedAllHandler = async (req, res, next) => {
  try {
    await CheckedPropertiesAll(req.body);
    res.status(200).send({ message: "checked all successfullyy!!" });
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};

export const updateStageHandler = async (req, res, next) => {
  try {
    await UpdateStage(req.body);
    res.status(200).send({ message: "updated stage successfullyy!!" });
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};

export const updateCheckTableHandler = async (req, res, next) => {
  try {
    await UpdateCheckedTable(req.body);
    res.status(200).send({ message: "updated checked table successfullyy!!" });
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};

export const updateOriginInfoHandler = async (req, res, next) => {
  try {
    await UpdateTableData(req.body);
    res.status(200).send({ message: "updated table successfullyy!!" });
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};
