SELECT *
FROM IndexCard
WHERE 
    (ExamNo = @:examNo OR @:examNo IS NULL)
    AND (ApplicationNo = @:applicationNo OR @:applicationNo IS NULL)
    AND (NameOfOwner LIKE @:nameOfOwner OR @:nameOfOwner IS NULL)
    AND (Place LIKE @:place OR @:place IS NULL)
    AND (Parish = @:parish OR @:parish IS NULL)
    AND (ValuationNo LIKE @:valuationNo OR @:valuationNo IS NULL)
    AND (NameOfApplicant LIKE :nameOfApplicant OR :nameOfApplicant IS NULL)
    AND (NameOnTaxRoll LIKE :nameOnTaxRoll OR :nameOnTaxRoll IS NULL)
    AND (PIDNo LIKE :pidNo OR :pidNo IS NULL)
    AND (LodgedBy LIKE :lodgedBy OR :lodgedBy IS NULL);
