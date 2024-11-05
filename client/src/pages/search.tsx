import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import artsImage from "../assets/departments/arts.webp";
import smartHome from "../assets/departments/smartHome.webp";
import videoGames from "../assets/departments/videoGames.webp";
import automotive from "../assets/departments/automotive-2.webp";
import baby from "../assets/departments/baby.webp";
import beauty from "../assets/departments/beauty_and_personal_care.webp";
import books from "../assets/departments/books.webp";
import boysFashion from "../assets/departments/boys_fashion.webp";
import computer from "../assets/departments/computers.webp";
import deals from "../assets/departments/deals.webp";
import digitalMusic from "../assets/departments/digital_music.webp";
import electronics from "../assets/departments/electronics.webp";
import girlsFashion from "../assets/departments/girls_fashion.webp";
import health from "../assets/departments/health_and_household.webp";
import home from "../assets/departments/home_and_kitchen.webp";
import industrial from "../assets/departments/industrial_and_scientific.webp";
// import kindle from "../assets/departments/k";
import luggage from "../assets/departments/luggage.webp";
import mensFashion from "../assets/departments/mens_fashion.webp";
import movies from "../assets/departments/movies_and_tv.webp";
import music from "../assets/departments/music_cd_vinyl.webp";   
import pet from "../assets/departments/pet_supplies.webp";
import prime from "../assets/departments/prime_video.webp";
import software from "../assets/departments/software.webp";
import sports from "../assets/departments/sports_and_outdoors.webp";
import toys from "../assets/departments/toys_and_games.webp";
// import tools from "../assets/departments/tools_and_home_improvement.webp";
// import womensFashion from "../assets/departments/wom";


import logoImage from "../assets/logo/logo5.webp";
import '../styles.css';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const departments = [
        { title: 'Arts & Crafts', image: artsImage },
        { title: 'Automotive', image: automotive },
        { title: 'Baby', image: baby },
        { title: 'Beauty & Personal Care', image: beauty },
        { title: 'Books', image: books },
        { title: 'Boys Fashion', image: boysFashion },
        { title: 'Computers', image: computer },
        { title: 'Deals', image: deals},
        { title: 'Digital Music', image: digitalMusic },
        { title: 'Electronics', image: electronics },
        { title: 'Girls Fashion', image: girlsFashion },
        { title: 'Health & Household', image: health },
        { title: 'Home & Kitchen', image: home },
        { title: 'Industrial & Scientific', image: industrial },
        // { title: 'Kindle Store', image: kindle },
        { title: 'Luggage', image: luggage },
        { title: 'Mens fashion', image: mensFashion },
        { title: 'Movies & TV', image: movies },
        { title: 'Music, CDs & Vinyl', image: music },
        { title: 'Pet Supplies', image: pet },
        { title: 'Prime Video', image: prime },
        { title: 'Smart Home', image: smartHome },
        { title: 'Software', image: software },
        { title: 'Sports and outdoors', image: sports },
        { title: 'Toys & Games', image: toys },
        // { title: 'Tools & Home improvement', image: tools },
        { title: 'Video Games', image: videoGames },
        // { title: 'Womens Fashion', image: womensFashion },
    ];

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/searchResults?searchTerm=${encodeURIComponent(searchTerm)}`);
    };

    const handleDepartmentClick = (title: string) => {
        navigate(`/searchResults?searchTerm=${encodeURIComponent(title)}`);
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
                        onClick={() => navigate('/')}
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

            {/* Search Bar */}
            <div className="w-full max-w-md mt-8 px-6">
                <form onSubmit={handleSearch} className="flex items-stretch">
                    <input 
                        type="text"
                        name="searchInput"
                        placeholder="Search for a category or product"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-l-md custom-focus-ring"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold px-4 py-3 rounded-r-md hover:bg-blue-800"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Department List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 mt-6 overflow-y-auto w-full max-w-6xl">
                {departments.map((department, index) => (
                    <div
                        key={index}
                        onClick={() => handleDepartmentClick(department.title)}
                        className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between items-center transform transition-transform duration-300 hover:scale-105"
                    >
                        <div className="w-full h-40 overflow-hidden">
                            <img 
                                src={department.image} 
                                alt={department.title} 
                                className="w-full h-full object-cover"
                                srcSet={`${department.image} 1x, ${department.image.replace('.webp', '@2x.webp')} 2x`}
                            />
                        </div>
                        <h3 className="mt-5 mb-5 text-lg font-semibold text-gray-800">{department.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};