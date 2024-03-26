import { promises as fsPromises } from 'fs';
import { join } from 'path';

export const loadSqlQueries = async (folderName) => {
    const filePath = join(process.cwd(), 'src', 'services', folderName);
    const files = await fsPromises.readdir(filePath);
    const sqlFiles = files.filter(f => f.endsWith('.sql'));
    const queries = {};
    for (const sqlfile of sqlFiles) {
        const query = await fsPromises.readFile(join(filePath, sqlfile), { encoding: "UTF-8" });
        queries[sqlfile.replace(".sql", "")] = query;
    }
    return queries;
};


export const convartTtitle = {
    "landTitlesQuery": "Originating Information",
    "transfersQuery": "Transfer",
    "mortgagesQuery": "Mortgage",
    "leaseQuery": "Lease/Sub-lease",
    "surrenderOfLeaseQuery": "Surrender of Lease",
    "powerOfSaleQuery": "Power of Sale Transfer",
    "transferOfPartQuery": "Transfer of Part of Land",
    "transferOfMortgageQuery": "Transfer of Mortgage",
    "transferOfLeaseQuery": "Transfer of Lease",
    "transmissionApplicationQuery": "Transmission Application",
    "dischargeOfMortgageQuery": "Discharge of Mortgage",
    "partialDischargeOfMortgageQuery": "Partial Discharge of Mortgage",
    "applicationToNoteDeathQuery": "Application to Note Death",
    "adversePossessionQuery": "Application to Note Change of Name",
    "applicationToAmendQuery": "Application to Amend",
    "oneHoldingQuery": "One Holding",
    "miscellaneousQuery": "Miscellaneous",
    "mapQuery": "Map",
    "lodgerQuery": "19",
}