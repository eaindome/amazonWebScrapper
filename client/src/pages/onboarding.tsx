import React from 'react';
import Icon from '@mdi/react';

import { useNavigate } from 'react-router-dom';
import { mdiFlagVariant } from '@mdi/js';

import onboardingImage from '../assets/onboarding/onboard2.webp';
import logoImage from '../assets/logo/logo3.webp'

export default function Onboarding() {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col h-screen bg-white'>
            {/* Header */}
            <header className='w-full py-4 px-6 bg-white flex justify-between items-center'>
                {/* Logo */}
                <div className="flex flex-col mt-10 pl-24 items-center">
                    <Icon path={mdiFlagVariant} size={1} color="orange" />
                    <span className="text-2xl font-extrabold text-blue-600">
                        Scrape
                        <span className="font-normal text-blue-500">mate</span>
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <div className='flex flex-grow'>
                {/* Left side - Text Section */}
                <div className='w-2/6 flex flex-col items-start justify-start p-10'>
                    <h1 className='text-8xl mb-8 mt-5 font-extrabold text-gray-800 text-left pl-20' style={{ fontFamily: 'Lato, sans-serif' }}>
                        Online Scrapping...
                    </h1>
                    <p className='text-xl text-gray-800 mb-9 text-left pl-20' style={{ fontFamily: 'Lato, sans-serif' }}>
                        Welcome to <span className="text-2xl font-extrabold text-blue-600">
                                        Scrape
                                        <span className="font-normal text-blue-500">mate</span>
                                    </span> – your go-to tool for easy Amazon product searches and insights. 
                        Discover trends in fashion, beauty, and more. 
                        Start exploring now!
                    </p>
                    <button
                        onClick={() => navigate('/search')}
                        className='px-8 py-4 bg-blue-600 font-bold text-white text-2xl rounded-xl hover:bg-blue-800 transition duration-300 shadow-md hover:shadow-lg'
                        style={{ fontFamily: 'Lato, sans-serif', marginLeft: '4.85rem' }}
                    >
                        Get Started
                    </button>
                </div>

                {/* Right side - Image Section */}
                <div className='w-4/6 flex items-center justify-center mt-1 mb-14 object-fill'>
                    <img src={onboardingImage} alt="Onboarding Illustration" className='w-3/5 h-auto mb-20' />
                </div>
            </div>
        </div>
    );
};