UPDATE OriginatingInfo
SET Verified = @NewVerifiedValue, StageLevel = @StageLevel
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for Transfers table
UPDATE Transfers
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for Lease table
UPDATE Lease
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for SurrenderOfLease table
UPDATE SurrenderOfLease
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for PowerOfSale table
UPDATE PowerOfSale
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for TransferOfPart table
UPDATE TransferOfPart
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for Mortgages table
UPDATE Mortgage
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for TransferOfMortgage table
UPDATE TransferOfMortgage
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for TransferOfLease table
UPDATE TransferOfLease
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for TransmissionApplication table
UPDATE TransmissionApplication
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for DischargeOfMortgage table
UPDATE DischargeOfMortgage
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for PartialDischargeOfMortgage table
UPDATE PartialDischargeOfMortgage
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for ApplicationToNoteDeath table
UPDATE ApplicationToNoteDeath
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

UPDATE AdversePossession
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for ApplicationToAmend table
UPDATE ApplicationToAmend
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for OneHolding table
UPDATE OneHolding
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;

-- Update statement for Miscellaneous table
UPDATE Miscellaneous
SET Verified = @NewVerifiedValue
WHERE VolumeNo = @VolumeNo AND FolioNo = @FolioNo;


UPDATE AttributeProperties
SET AttributeStatus = @AttributeVerified
WHERE AttributeVolumeNo = @VolumeNo AND AttributeFolioNo = @FolioNo;
