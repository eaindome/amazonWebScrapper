import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

let db: Db;

export const connectDB = async () => {
    try {
        await client.connect();
        db = client.db("amazonScraperDB");
        console.log("Connected to MongoDB successfully.");
    } catch (err) {
        console.error(`MongoDB connection error: ${err}`);
    }
};

export const getDB = (): Db => {
    if (!db) throw new Error("Database not initialized.");
    return db;
};