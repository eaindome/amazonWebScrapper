import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import logoImage from "../assets/logo/logo5.webp";
import '../styles.css';

interface Product {
    title: string;
    price: string;
    imageUrl: string;
    category: string;
    lastUpdated: string;
    productLink: string;
    rating: string;
    reviewsCount: string;
}

export default function Scrape() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:3000/api/scrape/${searchTerm}`);
            // console.log(`Response: ${response}`);
            setProducts(response.data.products); // Access the products array within the response object
        } catch (error) {
            console.error(`Error fetching products: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating: string) => {
        if (!rating) return null;
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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <header className="w-full py-1 px-6 bg-blue-600 shadow-md flex justify-between items-center">
                <button onClick={() => navigate('/')} className="flex items-center">
                    <img src={logoImage} alt="Logo" className="h-10 w-auto" />
                </button>
                <nav className="flex space-x-4">
                    <button
                        onClick={() => navigate('/search')}
                        className="text-white font-bold text-lg hover:underline hover:text-gray-800"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate('/search')}
                        className="text-white font-bold text-lg hover:underline hover:text-gray-800"
                    >
                        Search
                    </button>
                </nav>
            </header>

            {/* Search Bar */}
            <div className="w-full max-w-md mt-8 px-6">
                <form onSubmit={handleSearch} className="flex items-stretch">
                    <input 
                        type="text" 
                        placeholder="Search for a category or product"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-l-md custom-focus-ring"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold px-4 py-3 rounded-r-md hover:bg-blue-800 "
                    >
                        Scrape
                    </button>
                </form>
            </div>

            {/* Product List */}
            <div className="w-full max-w-6xl mt-6">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    products.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <p>No products found/scraped.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product, index) => (
                                <a 
                                    key={index} 
                                    href={`https://www.amazon.com${product.productLink}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
                                >
                                    <img src={product.imageUrl} alt={product.title} className="w-32 h-32 object-fill mb-4" loading="lazy" />
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
                    )
                )}
            </div>
        </div>
    );
};