import puppeteer from "puppeteer-extra";
import { scrapeCategory } from "../src/controllers/scraper";

jest.mock('puppeteer-extra');

describe('scrapeCategory', () => {
    const mockBrowser = { close: jest.fn() };
    const mockPage = {
        goto: jest.fn(),
        setUserAgent: jest.fn(),
        setExtraHTTPHeaders: jest.fn(),
        setViewport: jest.fn(),
        waitForSelector: jest.fn(),
        content: jest.fn(),
        evaluate: jest.fn(),
        close: jest.fn().mockResolvedValue(undefined),
    };

    beforeAll(() => {
        (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);
        (mockBrowser as any).newPage = jest.fn().mockResolvedValue(mockPage);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test(
        'should scrape products from the given category URL', 
        async () => {
            const categoryURL = 'https://example.com';
            const category = 'electronics';

            // mock the page.evaluate method to return some products
            (mockPage.evaluate as jest.Mock).mockResolvedValue([
                { title: 'Product 1', price: '$100', imageUrl: 'http://example.com/image1', rating: '4.5' },
                { title: 'Product 2', price: '$200', imageUrl: 'http://example.com/image2', rating: '4.0' }
            ]);

            const products = await scrapeCategory(categoryURL, category);

            expect(products).toEqual([
                { title: 'Product 1', price: '$100', imageUrl: 'http://example.com/image1', rating: '4.5', category, lastUpdated: expect.any(Date) },
                { title: 'Product 2', price: '$200', imageUrl: 'http://example.com/image2', rating: '4.0', category, lastUpdated: expect.any(Date) }
            ]);

            expect(mockPage.goto).toHaveBeenCalledWith(categoryURL, { waitUntil: 'networkidle2', timeout: 120000 });
            expect(mockPage.evaluate).toHaveBeenCalled();
            expect(mockBrowser.close).toHaveBeenCalled();
        }
    );
});