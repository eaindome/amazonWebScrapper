import http, { IncomingMessage, ServerResponse } from "http";
import cron from 'node-cron';
import dotenv from 'dotenv';
import './utils/scheduler';
import { scrapeCategory } from "./controllers/scraper";
import { connectDB } from "./database/dbConfig";
import { serverHandler } from "./server";
import { categories, generateCategoriesToScrape} from "./utils/catUtils";

dotenv.config();

const PORT = 3000;
const ALLOWED_ORIGINS = ['http://localhost:5173/'];

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url ?? '';
    const method = req.method ?? '';

    // set CORS headers
    // const origin = req.headers.origin ?? '';
    // if (ALLOWED_ORIGINS.includes(origin)) {
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // handle preflight requests
    if (method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // route: scrape category - GET /api/scrape/:category
    if (method === 'GET' && url.startsWith('/api/scrape/')) {
        const category = decodeURIComponent(url.split('/').pop() ?? '');
        const categoryUrl = `https://www.amazon.com/s?k=${encodeURIComponent(category)}`;

        try {
            const products = await scrapeCategory(categoryUrl, category);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Scraped ${products.length} products from Amazon category: ${category}`, products }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Error scraping Amazon category: ${error}` }));
        }
    } else {
        serverHandler(req, res);
        /**
        // res.writeHead(404, { 'Content-Type': 'application/json' });
        // res.end(JSON.stringify({ message: 'Route not found' }));*/
    }
});


// a cron job to scrape categories at midnight everyday
const categoriesToScrape = generateCategoriesToScrape(categories);

const cronSchedule = process.env.CRON_SCHEDULE || "0 0 * * *";
cron.schedule(cronSchedule, async () => {
    console.log(`[${new Date().toISOString()}] Running scheduled scraping job...`);
    for (const category of categoriesToScrape) {
        for (const subCat of category.subcategories) {
            try {
                const products = await scrapeCategory(subCat.url, subCat.name);
                console.log(`Scraped ${products.length} products for category: ${category.name}`);
            } catch (error) {
                console.error(`Failed to scrape category: ${subCat.name}: ${error}`);
            }
        }
    }
    console.log(`[${new Date().toISOString()}] Scheduled scraping job completed.`);
});


const main = async () => {
    await connectDB();
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
};

main().catch((error) => console.error(`Server failed to start: ${error}`));