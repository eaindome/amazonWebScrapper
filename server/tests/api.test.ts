import request from 'supertest';
import express from 'express';
import { scrapeCategory } from '../src/controllers/scraper';

jest.mock('../src/controllers/scraper');

const app = express();
app.get('/api/scrape', async (req, res) => {
    const products = await scrapeCategory('https://example.com', 'electronics');
    res.json(products);
});

describe('GET /api/scrape', () => {
    it('should return scraped products', async () => {
        (scrapeCategory as jest.Mock).mockResolvedValue([
            { title: 'Product 1', price: '$100', imageUrl: 'http://image1.com' },
            { title: 'Product 2', price: '$200', imageUrl: 'http://image2.com' },
        ]);

        const response = await request(app).get('/api/scrape');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { title: 'Product 1', price: '$100', imageUrl: 'http://image1.com' },
            { title: 'Product 2', price: '$200', imageUrl: 'http://image2.com' },
        ]);
    });
});