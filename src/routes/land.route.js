import { Router } from "express";
import {
  getAllLands,
  getIndexCard,
  getLandTitleDetails,
  updateIdentityHandler,
} from "../controllers/lands/land.controller.js";
import {
  attributeCheckedAllHandler,
  attributeCommentHandler,
  attributeEditHandler,
  attributeStatusHandler,
  createOrUpdateTableCommentHandler,
  getPropertyHandler,
  updateCheckTableHandler,
  updateOriginInfoHandler,
  updateStageHandler,
} from "../controllers/lands/attribute.controller.js";
import {
  checkAllVerifiedHandler,
  getIndexAttributesHandler,
  getIndexCardDetail,
  indexAttributeEditHandler,
  indexAttributeStatusHandler,
  updateIndexCardValueHandler,
  updateIndexCommentHandler,
  updateIndexStageHandler,
  updateIndexVerfiedHandler,
} from "../controllers/indexCards/indexcard.controller.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import { ROLES_LIST } from "../config/roles_list.js";

const router = Router();

router.post(
  "/lands",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  getAllLands
);
router.post(
  "/land_title_details",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  getLandTitleDetails
);
router.post(
  "/identity",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  updateIdentityHandler
);
router.post(
  "/comment",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  createOrUpdateTableCommentHandler
);
router.post(
  "/attribute_comment",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  attributeCommentHandler
);
router.post(
  "/attribute_accept",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  attributeStatusHandler
);
router.post(
  "/attribute_edit",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  attributeEditHandler
);
router.post(
  "/attributes",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  getPropertyHandler
);
router.post("/checked", attributeCheckedAllHandler);
router.put(
  "/stage",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  updateStageHandler
);
router.put(
  "/checked_table",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  updateCheckTableHandler
);

router.put(
  "/originIfno",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  updateOriginInfoHandler
);

//indexcard
router.post(
  "/index_card",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  getIndexCard
);
router.put(
  "/index_card",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  updateIndexCardValueHandler
);

router.post(
  "/index_card_details",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  getIndexCardDetail
);
router.put(
  "/index_card_verified",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  updateIndexVerfiedHandler
);
router.put(
  "/index_card_comment",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  updateIndexCommentHandler
);
router.post(
  "/index_card/attribute_status",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  indexAttributeStatusHandler
);
router.post(
  "/index_card/attributes",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  getIndexAttributesHandler
);
router.post(
  "/index_card/attributes_accept",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  checkAllVerifiedHandler
);
router.post(
  "/index_card/stage",
  verifyRoles(ROLES_LIST.General, ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  updateIndexStageHandler
);

export default router;
