const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('amazonScraperDB');
        const collection = database.collection('products');

        // Query the collection
        const query = {}; // Adjust the query as needed
        const products = await collection.find(query).toArray();

        console.log('Products:', products);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);