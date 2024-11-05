const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://eaindome:Eai810675@cluster0.d7fbb.mongodb.net/amazonScraperDB?retryWrites=true&w=majority&appName=Cluster0";
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