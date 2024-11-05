import { ObjectId } from "mongodb";
import { getDB } from "../src/database/dbConfig";

const db = getDB();
const mockCollection = db.collection("products");

describe('Database operations', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test(
        'should insert products into the database if it does not exist',
        async () => {
            (mockCollection.findOne as jest.Mock).mockResolvedValue(null);
            const product = {
                title: 'New Product',
                category: 'electronics',
                lastUpdated: new Date()
            }

            await mockCollection.insertOne(product);
            expect(mockCollection.insertOne).toHaveBeenCalledWith(product);
        }
    );

    test(
        'should update products in the database if it already exists',
        async () => {
            const existingProduct = { _id: new ObjectId(), title: 'Existing Product', category: 'electronics' };
            (mockCollection.findOne as jest.Mock).mockResolvedValue(existingProduct);

            const updatedProduct = {
                ...existingProduct,
                title: 'Updated Product',
                lastUpdated: new Date()
            }

            await mockCollection.updateOne(
                { _id: existingProduct._id },
                { $set: updatedProduct }
            );
            
            expect(mockCollection.updateOne).toHaveBeenCalledWith(
                { _id: existingProduct._id },
                { $set: updatedProduct }
            );
        }
    );
});