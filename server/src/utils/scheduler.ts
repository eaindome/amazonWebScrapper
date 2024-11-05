import cron from "node-cron";
import purgeOldData from "./purgeOldData";

cron.schedule("0 0 * * 0", async () => {
    console.log(`[${new Date().toISOString()}] Running scheduled purge of old data...`);
    await purgeOldData();
});