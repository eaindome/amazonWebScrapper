import { IncomingMessage, ServerResponse } from "http";
import { getDB } from "./database/dbConfig";
import { parseQueryParams } from "./utils/utils";
import { getCache, setCache } from "./utils/cache";

const TTL_SECONDS = 60 * 60;

// GET endpoint handler for /products
async function handleGetProducts(req: IncomingMessage, res: ServerResponse) {
    const queryParams = parseQueryParams(req.url ?? "");
    const db = getDB();
    const collection = db.collection("products");

    const { category, minPrice, maxPrice, sortBy, order, minRating, reviewsFilter } = queryParams;
    console.log('Query Parameters:', queryParams);


    if (!category) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Category is required." }));
    }

    const cacheKey = `products:${encodeURIComponent(category)}:${minPrice || ''}:${maxPrice || ''}:${sortBy || ''}:${order || ''}:${minRating || ''}:${reviewsFilter || ''}`;

    // check if the particular product is cached
    const cachedData = await getCache(cacheKey);
    if (cachedData && cachedData.length > 0) {
        console.log("Serving from the cache database...");
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(cachedData));
    }

    // building the query object based on the given query parameters
    const query: any = { category: new RegExp(category, 'i') };
    console.log(`query: ${JSON.stringify(query)}`);
    if (minPrice || maxPrice) {
        query.$expr = {
            $and: []
        };
        if (minPrice) {
            query.$expr.$and.push({
                $gte: [
                    { $convert: { input: { $substr: ["$price", 1, -1] }, to: "double", onError: null, onNull: null } },
                    parseFloat(minPrice)
                ]
            });
        }
        if (maxPrice) {
            query.$expr.$and.push({
                $lte: [
                    { $convert: { input: { $substr: ["$price", 1, -1] }, to: "double", onError: null, onNull: null } },
                    parseFloat(maxPrice)
                ]
            });
        }
    }
    if (minRating) {
        query.rating = { $gte: parseFloat(minRating) };
    }

    // Handle reviews filtering
    if (minRating) {
        query.$expr = query.$expr || { $and: [] };
        query.$expr.$and.push({
            $gte: [
                { $convert: { input: { $arrayElemAt: [{ $split: ["$rating", " "] }, 0] }, to: "double", onError: null, onNull: null } },
                parseFloat(minRating)
            ]
        });
        console.log(`query: ${JSON.stringify(query)}`);
    }

    // fetching and storing products from the database
    const sortOptions: { [key: string]: 1 | -1 } = sortBy ? { [sortBy]: order === "desc" ? -1 : 1 } : {};

    let products;
    try {
        products = await collection.find(query).sort(sortOptions).toArray();
        // console.log(`Products: ${JSON.stringify(products, null, 2)}`);
    } catch (error) {
        console.error(`Error fetching products: ${error}`);
    }

    // store the result in cache
    await setCache(cacheKey, products, TTL_SECONDS);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
}


export function serverHandler(req: IncomingMessage, res: ServerResponse) {
    const url = req.url ?? '';
    const method = req.method ?? '';

    if (method === "GET" && url.startsWith("/api/products")) {
        handleGetProducts(req, res);
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
    }
};