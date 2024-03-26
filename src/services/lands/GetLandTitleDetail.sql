SELECT
    OneHolding.*,
    Lodger.WhoLodged,
    Lodger.LodgerAddress,
    Lodger.LodgerEmail,
    Lodger.LodgerPhoneNumber
FROM 
    OriginatingInfo
    LEFT JOIN Transfers ON OriginatingInfo.VolumeNo = Transfers.VolumeNo AND OriginatingInfo.FolioNo = Transfers.FolioNo
    LEFT JOIN Mortgages ON OriginatingInfo.VolumeNo = Mortgages.VolumeNo AND OriginatingInfo.FolioNo = Mortgages.FolioNo
    LEFT JOIN Lease ON OriginatingInfo.VolumeNo = Lease.VolumeNo AND OriginatingInfo.FolioNo = Lease.FolioNo
    LEFT JOIN SurrenderOfLease ON OriginatingInfo.VolumeNo = SurrenderOfLease.VolumeNo AND OriginatingInfo.FolioNo = SurrenderOfLease.FolioNo
    LEFT JOIN PowerOfSale ON OriginatingInfo.VolumeNo = PowerOfSale.VolumeNo AND OriginatingInfo.FolioNo = PowerOfSale.FolioNo
    LEFT JOIN TransferOfPart ON OriginatingInfo.VolumeNo = TransferOfPart.VolumeNo AND OriginatingInfo.FolioNo = TransferOfPart.FolioNo
    LEFT JOIN TransferOfMortgage ON OriginatingInfo.VolumeNo = TransferOfMortgage.VolumeNo AND OriginatingInfo.FolioNo = TransferOfMortgage.FolioNo
    LEFT JOIN TransferOfLease ON OriginatingInfo.VolumeNo = TransferOfLease.VolumeNo AND OriginatingInfo.FolioNo = TransferOfLease.FolioNo
    LEFT JOIN TransmissionApplication ON OriginatingInfo.VolumeNo = TransmissionApplication.VolumeNo AND OriginatingInfo.FolioNo = TransmissionApplication.FolioNo
    LEFT JOIN DischargeOfMortgage ON OriginatingInfo.VolumeNo = DischargeOfMortgage.VolumeNo AND OriginatingInfo.FolioNo = DischargeOfMortgage.FolioNo
    LEFT JOIN PartialDischargeOfMortgage ON OriginatingInfo.VolumeNo = PartialDischargeOfMortgage.VolumeNo AND OriginatingInfo.FolioNo = PartialDischargeOfMortgage.FolioNo
    LEFT JOIN ApplicationToNoteDeath ON OriginatingInfo.VolumeNo = ApplicationToNoteDeath.VolumeNo AND OriginatingInfo.FolioNo = ApplicationToNoteDeath.FolioNo
    LEFT JOIN AdversePossession ON OriginatingInfo.VolumeNo = AdversePossession.VolumeNo AND OriginatingInfo.FolioNo = AdversePossession.FolioNo
    LEFT JOIN ApplicationToAmend ON OriginatingInfo.VolumeNo = ApplicationToAmend.VolumeNo AND OriginatingInfo.FolioNo = ApplicationToAmend.FolioNo
    LEFT JOIN OneHolding ON OriginatingInfo.VolumeNo = OneHolding.VolumeNo AND OriginatingInfo.FolioNo = OneHolding.FolioNo
    LEFT JOIN Miscellaneous ON OriginatingInfo.VolumeNo = Miscellaneous.VolumeNo AND OriginatingInfo.FolioNo = Miscellaneous.FolioNo
    LEFT JOIN Map ON OriginatingInfo.VolumeNo = Map.VolumeNo AND OriginatingInfo.FolioNo = Map.FolioNo
    LEFT JOIN Lodger ON OriginatingInfo.VolumeNo = Lodger.VolumeNo AND OriginatingInfo.FolioNo = Lodger.FolioNo
WHERE
    OriginatingInfo.VolumeNo = @VolumeNo
    AND OriginatingInfo.FolioNo = @FolioNo;
