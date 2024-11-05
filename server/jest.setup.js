// mock the database
jest.mock('./src/database/dbConfig', () => {
    const mockDB = {
        collection: jest.fn().mockReturnThis(),
        insertOne: jest.fn(),
        findOne: jest.fn(),
        updateOne: jest.fn(),
        bulkWrite: jest.fn(),
        deleteMany: jest.fn(),
    };
    return { getDB: () => mockDB };
});