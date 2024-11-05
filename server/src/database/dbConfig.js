"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = exports.connectDB = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGODB_URI || '';
const client = new mongodb_1.MongoClient(uri);
let db;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        db = client.db("amazonScraperDB");
        console.log("Connected to MongoDB successfully.");
    }
    catch (err) {
        console.error(`MongoDB connection error: ${err}`);
    }
});
exports.connectDB = connectDB;
const getDB = () => {
    if (!db)
        throw new Error("Database not initialized.");
    return db;
};
exports.getDB = getDB;
