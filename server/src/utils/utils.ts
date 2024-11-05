import { parse } from 'url';

export const parseQueryParams = (url: string) => {
    const query = parse(url, true).query;
    return {
        category: query.category ? decodeURIComponent(query.category as string) : '',
        minPrice: query.minPrice ? query.minPrice as string : '',
        maxPrice: query.maxPrice ? query.maxPrice as string : '',
        sortBy: query.sortBy ? query.sortBy as string : '',
        order: query.order ? query.order as string : '',
        minRating: query.minRating ? query.minRating as string : '',
        reviewsFilter: query.reviewsFilter ? query.reviewsFilter as string : ''
    };
};