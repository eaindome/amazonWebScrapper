import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { getDB } from "../database/dbConfig";
import { Product } from "../types/productTypes";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

puppeteer.use(StealthPlugin());

async function retry<T>(fn: () => Promise<T>, retries: number, delayMs: number, fallback: T): Promise<T> {
    let attempt = 0;
    while (attempt < retries) {
        try {
            return await fn();
        } catch (error) {
            attempt++;
            if (attempt >= retries) {
                throw error;
            }
            console.error(`Retrying due to error: ${error}. Attempt ${attempt} of ${retries}`);
            await delay(delayMs);
        }
    }
    console.warn("All retry attempts failed. Using fallback.");
    return fallback;
    // throw new Error("Max retries exceeded");
}

/**
 * function to scrape Amazon products by category
 * @param categoryUrl - Amazon category URL
 * @param category - category name for storing in the database
 * @returns - array of products scraped from the category
 */
async function scrapeCategory(categoryUrl: string, category: string): Promise<Product[]> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // console.log(`categoryURL: ${categoryUrl}\ncategory: ${category}`);

    const userAgents = [
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
        "Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Mobile Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/85.0"
    ];
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    await page.setUserAgent(randomUserAgent);

    await page.setExtraHTTPHeaders({
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8", 
        "Accept-Encoding": "gzip, deflate, br, zstd", 
        "Accept-Language": "en-US,en"
    });

    await page.setViewport({ width: 1280, height: 800 });

    try {
        await retry (() => page.goto(categoryUrl, {
            waitUntil: 'networkidle2',
            timeout: 120000
        }), 3, 3000, undefined);

        /**
        // const content = await page.content();
        // console.log(`Content: ${content}`);

        // await retry(() => page.waitForSelector('[data-component-type="s-search-result"]', {
        //     timeout: 120000
        // }), 3, 3000, undefined); */

        console.log(`[${new Date().toISOString()}] Starting scraping for category: ${category}`);

        // extract product data
        const products = await retry(async () => {
            await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 120000 });

            return await page.evaluate(() => {
                const items = Array.from(document.querySelectorAll('[data-component-type="s-search-result"]'));
                return items.map(item => ({
                    title: item.querySelector('h2')?.textContent?.trim() || 'No title',
                    price: item.querySelector('.a-price .a-offscreen')?.textContent?.trim() || 'No price',
                    imageUrl: item.querySelector('img')?.getAttribute('src') || 'No image',
                    rating: item.querySelector('.a-icon-alt')?.textContent?.trim() || 'No rating',
                    reviewsCount: item.querySelector('.a-size-base')?.textContent?.trim() || 'No reviews',
                    productLink: item.querySelector('a.a-link-normal')?.getAttribute('href') || 'No link'
                }));
            });
        }, 3, 3000, []);
        
        
        if (products.length) {
            console.log(`Scraped ${products.length} products from ${categoryUrl}`);
        } else {
            console.warn("Skipped category due to missing data.")
        }

        // map product data to match the Product interface
        const formattedProducts: Product[] = products.map(product => ({
            ...product,
            category,
            lastUpdated: new Date(),
        }));
        
        formattedProducts.forEach(product => {
            console.log(`Category: ${product.category}`);
        });

        // database operations
        const db = getDB();
        const collection = db.collection('products');

        /*// insert or update products in the database
        // for (const product of formattedProducts) {
        //     const existingProduct = await collection.findOne({ title: product.title, category: product.category });

        //     if (existingProduct) {
        //         await collection.updateOne(
        //             { _id: existingProduct._id },
        //             { $set: { ...product}}
        //         );
        //         console.log(`Updated product: ${product.title}`);
        //     } else {
        //         await collection.insertOne(product);
        //         console.log(`Inserted product: ${product.title}`);
        //     }
        // }

        // await collection.insertMany(formattedProducts);*/
        
        // bulk operations to reduce database overhead
        const bulkOps = formattedProducts.map(product => ({
            updateOne: {
                filter: { title: product.title, category: product.category },
                update: { $set: product },
                upsert: true
            }
        }));

        if (bulkOps.length) {
            await collection.bulkWrite(bulkOps);
            console.log(`Inserted ${formattedProducts.length} products into the database`);
        } else {
            console.warn("No products found for insertion.")
        }

        return formattedProducts;
    } catch (error) {
        console.error(`Failed to scrape Amazon category: ${error}`);
        return [];
    } finally {
        await page.close();
        await browser.close();
    }
};

export { scrapeCategory };