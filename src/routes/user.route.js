import { Router } from "express";
import { loginHandler } from "../controllers/auth/login.controller.js";
import { logoutHandler } from "../controllers/auth/logout.controller.js";
import { handleRefreshToken } from "../controllers/auth/refresh.controller.js";
import { registerHandler } from "../controllers/auth/register.controller.js";
 
 
import {
  emailResetPasswordHandler,
  forgotPasswordHandler,
  requestedMyInfo,
  requestedUserHandler,
  resetPasswordHandler,
  updateUserHandler,
} from "../controllers/auth/user.controller.js";

import {
  getPendingIndexCardHandler,
  getPendingLandDataHandler,
  updateAdminIndexStageHandler,
  updateAdminLandStageHandler,
} from "../controllers/admin/admin.controller.js";

import verifyJWT from "../middleware/verifyJWT.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import { ROLES_LIST } from "../config/roles_list.js";
 

const router = Router();
 
router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/logout", logoutHandler);
router.get("/refresh", handleRefreshToken);

router.post("/forgot-password", forgotPasswordHandler);
router.post("/reset-password/:username/:token", resetPasswordHandler);
router.put("/email-reset-password", emailResetPasswordHandler);

router.get(
  "/requested",
  verifyJWT,
  verifyRoles(ROLES_LIST.SuperAdmin),
  requestedUserHandler
);

router.post(
  "/my-info",
  verifyJWT,
  requestedMyInfo
);

router.put(
  "",
  verifyJWT,
  verifyRoles(ROLES_LIST.SuperAdmin),
  updateUserHandler
);

//admin
router.get(
  "/admin/index_card/:pageSize/:pageOffset",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  getPendingIndexCardHandler
);
router.get(
  "/admin/land_title",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  getPendingLandDataHandler
);
router.put(
  "/index_card/stage",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  updateAdminIndexStageHandler
);
router.put(
  "/land_data/stage",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.SuperAdmin),
  updateAdminLandStageHandler
);

export default router;
