import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logoImage from "../assets/logo/logo5.webp"; // Adjust the path to your logo image
import '../styles.css'

interface Product {
    _id: string;
    title: string;
    price: string;
    imageUrl: string;
    category: string;
    lastUpdated: string;
    productLink: string;
    rating: string;
    reviewsCount: string;
}

export default function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minReviews, setMinReviews] = useState('');
    const [minStars, setMinStars] = useState('');

    const queryParams = new URLSearchParams(location.search);
    const initialSearchTerm = queryParams.get('searchTerm') || '';

    useEffect(() => {
        if (initialSearchTerm) {
            setSearchTerm(initialSearchTerm);
            fetchProducts(initialSearchTerm);
        }
    }, [initialSearchTerm]);

    const fetchProducts = async (searchTerm: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/products?category=${encodeURIComponent(searchTerm)}`);
            setProducts(response.data);
        } catch (error) {
            console.error(`Error fetching products: ${error}`);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/searchResults?searchTerm=${encodeURIComponent(searchTerm)}`);
        fetchProducts(searchTerm);
    };

    const applyFilters = async () => {
        const queryParams = new URLSearchParams({
            category: searchTerm,
            minPrice: minPrice || '',
            maxPrice: maxPrice || '',
            minRating: minStars || '',
            reviewsFilter: minReviews || ''
        });

        try {
            const response = await axios.get(`http://localhost:3000/api/products?${queryParams.toString()}`);
            console.log(`qeuryParams: ${queryParams.toString()}`);
            setProducts(response.data);
        } catch (error) {
            console.error(`Error fetching filtered products: ${error}`);
        }
    };

    const renderStars = (rating: string) => {
        if (!rating) return null; // Check if rating is undefined or null
        const stars: JSX.Element[] = [];
        const ratingValue = parseFloat(rating.split(' ')[0]);
        for (let i = 1; i <= 5; i++) {
            if (i <= ratingValue) {
                stars.push(<i key={i} className="fas fa-star text-yellow-500"></i>);
            } else if (i - ratingValue < 1) {
                stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-500"></i>);
            } else {
                stars.push(<i key={i} className="far fa-star text-yellow-500"></i>);
            }
        }
        return stars;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="w-full py-1 px-6 bg-blue-600 shadow-md flex justify-between items-center fixed top-0 left-0 right-0 z-10">
                <button onClick={() => navigate('/')} className="flex items-center">
                    <img src={logoImage} alt="Logo" className="h-10 w-auto" />
                </button>
                <form onSubmit={handleSearch} className="flex items-stretch w-full max-w-2xl mx-4">
                    <input 
                        type="text" 
                        placeholder="Search for a category or product"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded-l-md custom-focus-ring"
                    />
                    <button
                        type="submit"
                        className="bg-blue-950 text-white font-bold px-4 py-1 rounded-r-md hover:bg-blue-300"
                    >
                        Search
                    </button>
                </form>
                <nav className="flex space-x-4">
                    <button
                        onClick={() => navigate('/search')}
                        className="text-white font-bold text-lg hover:underline hover:text-gray-800"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate('/scrape')}
                        className="text-white font-bold text-lg hover:underline hover:text-gray-800"
                    >
                        Scrape
                    </button>
                </nav>
            </header>

            <div className="flex flex-grow mt-12">
                {/* Sidebar */}
                <div className="w-1/7 p-7 bg-white shadow-md overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4">Filters</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Min Price</label>
                        <select
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:rounded-t-md focus:rounded-b-none focus:outline-none custom-select"
                        >
                            <option value="">Select Min Price</option>
                            <option value="10">$10</option>
                            <option value="20">$20</option>
                            <option value="50">$50</option>
                            <option value="100">$100</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Max Price</label>
                        <select
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:rounded-t-md focus:rounded-b-none focus:outline-none custom-select"
                        >
                            <option value="">Select Max Price</option>
                            <option value="50">$50</option>
                            <option value="100">$100</option>
                            <option value="200">$200</option>
                            <option value="500">$500</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Min Reviews</label>
                        <select
                            value={minReviews}
                            onChange={(e) => setMinReviews(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:rounded-t-md focus:rounded-b-none focus:outline-none custom-select"
                        >
                            <option value="">Select Min Reviews</option>
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Min Stars</label>
                        <select
                            value={minStars}
                            onChange={(e) => setMinStars(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:rounded-t-md focus:rounded-b-none focus:outline-none custom-select"
                        >
                            <option value="">Select Min Stars</option>
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </select>
                    </div>
                    <button
                        onClick={applyFilters}
                        className="w-full bg-blue-600 text-white font-bold py-2 rounded-md transition duration-300 hover:bg-blue-800 hover:shadow-lg"
                    >
                        Apply Filters
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-grow p-6 overflow-y-auto">
                    <h2 className="text-xl font-semibold mt-2">Search Results for "{initialSearchTerm}"</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 mt-1 overflow-y-auto w-full max-w-6xl">
                        {products.map((product) => (
                            <a 
                                key={product._id} 
                                href={`https://www.amazon.com${product.productLink}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
                            >
                                <img src={product.imageUrl} alt={product.title} className="w-32 h-32 object-cover mb-4" loading="lazy" />
                                <h3 className="text-sm font-bold text-left w-full">{product.title}</h3>
                                <div className="flex items-center mt-2">
                                    {renderStars(product.rating)}
                                    <p className="text-gray-600 ml-2">{product.rating}</p>
                                </div>
                                <p className="text-gray-600 mt-2 text-lg font-semibold text-left">Price: {product.price}</p>
                                <p className="text-gray-600 mt-2 text-left">{product.reviewsCount} reviews</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
