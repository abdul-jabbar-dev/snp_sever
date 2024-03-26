import { Router } from "express";

import verifyJWT from "../middleware/verifyJWT.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import { ROLES_LIST } from "../config/roles_list.js";
import {
  AdversePossessionDataHandler,
  ApplicationToAmendDataHandler,
  ApplicationToNoteDeathDataHandler,
  CaveatDataDataHandler,
  DischargeOfMortgageDataHandler,
  LeaseDataHandler,
  MiscellaneousDataHandler,
  MortgageDataHandler,
  OneHoldingDataHandler,
  PartialDischargeOfMortgageDataHandler,
  PowerOfSaleTransferDataHandler,
  SurrenderOfLeaseDataHandler,
  TransferHandler,
  TransferOfLeaseDataHandler,
  TransferOfMortgageDataHandler,
  TransferOfPartDataHandler,
  TransmissionApplicationDataHandler,
} from "../controllers/lands/form.controller.js";

const router = Router();

router.post("/transfer", TransferHandler);
router.post("/mortagage", MortgageDataHandler);

router.post("/lease", LeaseDataHandler);
router.post("/surrender_of_lease", SurrenderOfLeaseDataHandler);

router.post("/power_of_saletransfer", PowerOfSaleTransferDataHandler);
router.post("/transfer_of_part", TransferOfPartDataHandler);
router.post("/transfer_of_mortgage", TransferOfMortgageDataHandler);

router.post("/transfer_of_lease", TransferOfLeaseDataHandler);
router.post("/transmission_application", TransmissionApplicationDataHandler);

router.post("/discharge_of_mortgage", DischargeOfMortgageDataHandler);
router.post(
  "/partial_discharge_of_mortgage",
  PartialDischargeOfMortgageDataHandler
);

router.post("/application_to_note_death", ApplicationToNoteDeathDataHandler);
router.post("/adverse_possession", AdversePossessionDataHandler);

router.post("/application_to_amend", ApplicationToAmendDataHandler);
router.post("/one_holding", OneHoldingDataHandler);

router.post("/caveat", CaveatDataDataHandler);
router.post("/miscellaneous", MiscellaneousDataHandler);

export default router;
