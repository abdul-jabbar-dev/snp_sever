import {
  getLands,
  getIndexCards,
  lendTitleDetails,
  updateIdentity,
} from "../../services/lands/index.js";

export const getAllLands = async (req, res, next) => {
  try {
    const data = req.body;
    const landList = await getLands(data);
    res.send(landList);
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};

export const getIndexCard = async (req, res, next) => {
  try {
    const data = req.body;
    const { ApplicationNo, NameOfOwner, Place, Parish, ValuationNo } =
      data.values;

    const { pageOf, pageNumber } = data;

    let query = "SELECT * FROM IndexCard WHERE 1=1";

    if (ApplicationNo) query += ` AND ApplicationNo = '${ApplicationNo}'`;
    if (NameOfOwner) query += ` AND NameOfOwner LIKE '${NameOfOwner}'`;

    if (Place) query += ` AND Place LIKE '${Place}'`;
    if (Parish) query += ` AND Parish = '${Parish}'`;
    if (ValuationNo) query += ` AND ValuationNo LIKE '${ValuationNo}'`;

    if (query !== "SELECT * FROM IndexCard WHERE 1=1") {
      const indexCardList = await getIndexCards(query, pageOf, pageNumber);
      res.send(indexCardList);
    } else {
      res.send([]);
    }
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};

export const getSingleResultOrEmptyObject = async (query, params) => {
  const result = await lendTitleDetails(query, params);
  return result.length > 0 ? result[0] : {};
};

export const getLandTitleDetails = async (req, res, next) => {
  try {
    const { VolumeNo, FolioNo } = req.body;

    const landTileDetailsRespons = {
      OriginatingInfo: await getSingleResultOrEmptyObject(
        `SELECT * FROM OriginatingInfo WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo`,
        { VolumeNo, FolioNo }
      ),
    };
    res.send(landTileDetailsRespons);
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};

export const updateIdentityHandler = async (req, res, next) => {
  try {
    const identityRes = await updateIdentity(req.body);
    res.status(200).json({ message: "Identity updated successfully" });
  } catch (error) {
    console.log(error)
res.status(400).send(error.message);
  }
};
