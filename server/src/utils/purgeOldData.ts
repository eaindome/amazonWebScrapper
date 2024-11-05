import { getDB } from "../database/dbConfig";


const purgeOldData = async () => {
    const db = getDB();
    const collection = db.collection("products");
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - 7);

    try {
        const result = await collection.deleteMany({
            lastUpdated: { $lt: thresholdDate }
        });
        console.log(`[${new Date().toISOString()}] Purged ${result.deletedCount} old records.`);
    } catch (error) {
        console.error(`Failed to purge old data: ${error}`);
    }
};

export default purgeOldData;