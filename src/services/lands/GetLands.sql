-- Query for OriginatingInfo table
SELECT VolumeNo, FolioNo
FROM OriginatingInfo
WHERE
    (@VolumeNo IS NULL OR VolumeNo = @VolumeNo)
    AND (@FolioNo IS NULL OR FolioNo = @FolioNo)
    AND (@Parish IS NULL OR Parish = @Parish)
    AND EXISTS (
        SELECT 1
        FROM Caveats
        WHERE
            Caveats.VolumeNo = OriginatingInfo.VolumeNo
            AND Caveats.FolioNo = OriginatingInfo.FolioNo
            AND (@CaveatNo IS NULL OR Caveats.CaveatNo = @CaveatNo)
    )
    AND EXISTS (
        SELECT 1
        FROM StrataApplication
        WHERE
            StrataApplication.VolumeNo = OriginatingInfo.VolumeNo
            AND StrataApplication.FolioNo = OriginatingInfo.FolioNo
            AND (@StrataApplicationID IS NULL OR StrataApplication.StrataApplicationID = @StrataApplicationID)
    )
UNION
-- Query for Caveats table
SELECT VolumeNo, FolioNo
FROM Caveats
WHERE
    (@CaveatNo IS NULL OR CaveatNo = @CaveatNo)
    AND EXISTS (
        SELECT 1
        FROM OriginatingInfo
        WHERE
            OriginatingInfo.VolumeNo = Caveats.VolumeNo
            AND OriginatingInfo.FolioNo = Caveats.FolioNo
            AND (@VolumeNo IS NULL OR OriginatingInfo.VolumeNo = @VolumeNo)
            AND (@FolioNo IS NULL OR OriginatingInfo.FolioNo = @FolioNo)
            AND (@Parish IS NULL OR OriginatingInfo.Parish = @Parish)
    )
UNION
SELECT VolumeNo, FolioNo
FROM StrataApplication
WHERE
    (@StrataApplicationID IS NULL OR StrataApplicationID = @StrataApplicationID)
    AND EXISTS (
        SELECT 1
        FROM OriginatingInfo
        WHERE
            OriginatingInfo.VolumeNo = StrataApplication.VolumeNo
            AND OriginatingInfo.FolioNo = StrataApplication.FolioNo
            AND (@VolumeNo IS NULL OR OriginatingInfo.VolumeNo = @VolumeNo)
            AND (@FolioNo IS NULL OR OriginatingInfo.FolioNo = @FolioNo)
            AND (@Parish IS NULL OR OriginatingInfo.Parish = @Parish)
    )
ORDER BY VolumeNo OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;