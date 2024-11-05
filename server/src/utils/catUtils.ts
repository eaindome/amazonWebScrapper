type Subcategory = {
    name: string;
    url: string;
};

type Category = {
    name: string;
    subcategories: Subcategory[];
};

// categories to scrape periodically
const categories: Record<string, string[]> = {
    "Electronics": [
        "Accessories & Supplies",
        "Camera & Photo",
        "Car & Vehicle Electronics",
        "Cell Phones & Accessories",
        "Computers & Accessories",
        "GPS & Navigation",
        "Headphones",
        "Home Audio",
        "Office Electronics",
        "Portable Audio & Video",
        "Security & Surveillance",
        "Service Plans",
        "Television & Video",
        "Video Game Consoles & Accessories",
        "Video Projectors",
        "Wearable Technology",
        "eBook Readers & Accessories"
    ],

    "Computers": [
        "Computer Accessories & Peripherals",
        "Computer Components",
        "Computers & Tablets",
        "Data Storage",
        "External Components",
        "Laptop Accessories",
        "Monitors",
        "Networking Products",
        "Power Strips & Surge Protectors",
        "Printers",
        "Scanners",
        "Servers",
        "Tablet Accessories",
        "Tablet Replacement Parts",
        "Warranties & Services"
    ],

    "Smart Home": [
        "Amazon Smart Home",
        "Works with Alexa Devices",
        "Smart Home Lighting",
        "Smart Locks and Entry",
        "Security Cameras and Systems",
        "Plugs and Outlets",
        "New Smart Devices",
        "Heating and Cooling",
        "Detectors and Sensors",
        "Home Entertainment",
        "Pet",
        "Voice Assistants and Hubs",
        "Kitchen",
        "Vacuums and Mops",
        "Lawn and Garden",
        "WIFI and Networking",
    ],

    "Arts & Crafts": [
        "Art Supplies",
        "Beading & Jewelry Making",
        "Crafting",
        "Fabric",
        "Fabric Decorating",
        "Knitting & Crochet",
        "Needlework",
        "Organization, Storage & Transport",
        "Painting, Drawing & Art Supplies",
        "Printmaking",
        "Scrapbooking & Stamping",
        "Sewing",
        "Party Decorations & Supplies",
        "Gift Wrapping Supplies"
    ],

    "Automotive": [
        "Car Care",
        "Car Electronics & Accessories",
        "Exterior Accessories",
        "Interior Accessories",
        "Lights & Lighting Accessories",
        "Motorcycle & Powersports",
        "Oils & Fluids",
        "Paint & Paint Supplies",
        "Performance Parts & Accessories",
        "Replacement Parts",
        "RV Parts & Accessories",
        "Tires & Wheels",
        "Tools & Equipment",
        "Automotive Enthusiast Merchandise",
        "Heavy Duty & Commercial Vehicle Equipment",
    ],

    "Baby": [
        "Activity & Entertainment",
        "Apparel & Accessories",
        "Baby & Toddler Toys",
        "Baby Care",
        "Baby Stationery",
        "Car Seats & Accessories",
        "Diapering",
        "Feeding",
        "Gifts",
        "Nursery",
        "Potty Training",
        "Pregnancy & Maternity",
        "Safety",
        "Strollers & Accessories",
        "Travel Gear"
    ],

    "Beauty & Personal Care": [
        "Fragrance",
        "Hair Care",
        "Makeup",
        "Skin Care",
        "Tools & Accessories",
        "Shave & Hair Removal",
        "Personal Care",
        "Oral Care",
        "Foot, Hand & Nail Care"
    ],

    "Women's Fashion": [
        "Clothing",
        "Shoes",
        "Jewelry",
        "Watches",
        "Handbags",
        "Accessories",
    ],

    "Men's Fashion": [
        "Clothing",
        "Shoes",
        "Watches",
        "Accessories"
    ],

    "Girl's Fashion": [
        "Clothing",
        "Shoes",
        "Jewelry",
        "Watches",
        "Accessories",
        "School Uniforms"
    ],

    "Boy's Fashion": [
        "Clothing",
        "Shoes",
        "Jewelry",
        "Watches",
        "Accessories",
        "School Uniforms"
    ],

    "Health & Household": [
        "Baby & Child Care",
        "Health Care",
        "Household Supplies",
        "Medical Supplies & Equipment",
        "Oral Care",
        "Personal Care",
        "Sexual Wellness",
        "Sports Nutrition",
        "Stationery & Gift Wrapping Supplies",
        "Vision Care",
        "Vitamins & Dietary Supplements",
        "Wellness & Relaxation"
    ],

    "Home & Kitchen": [
        "Bath",
        "Bedding",
        "Event & Party Supplies",
        "Furniture",
        "Heating, Cooling & Air Quality",
        "Home Décor",
        "Kitchen & Dining",
        "Kids' Home Store",
        "Irons & Steamers",
        "Cleaning Supplies",
        "Seasonal Décor",
        "Lighting & Ceiling Fans",
        "Storage & Organization",
        "Vacuums & Floor Care",
        "Wall Art"
    ],

    "Industrial & Scientific": [
        "Abrasive & Finishing Products",
        "Additive Manufacturing Products",
        "Commercial Door Products",
        "Cutting Tools",
        "Fasteners",
        "Filtration",
        "Food Service Equipment & Supplies",
        "Hydraulics, Pneumatics & Plumbing",
        "Industrial Electrical",
        "Industrial Hardware",
        "Industrial Power & Hand Tools",
        "Janitorial & Sanitation Supplies",
        "Lab & Scientific Products",
        "Material Handling Products",
        "Occupational Health & Safety Products",
        "Packaging & Shipping Supplies",
        "Power Transmission Products",
        "Professional Dental Supplies",
        "Professional Medical Supplies",
        "Raw Materials",
        "Retail Store Fixtures & Equipment",
        "Robotics",
        "Science Education",
        "Tapes, Adhesives & Sealants",
        "Test, Measure & Inspect"
    ],

    "Luggage": [
        "Backpacks",
        "Gym Bags",
        "Laptop Bags",
        "Messenger Bags",
        "Travel Accessories",
        "Travel Totes",
        "Umbrellas",
        "Luggage Sets",
        "Garment Bags",
        "Kids Luggage",
        "Carry-Ons",
        "Suitcases"
    ],

    "Movies & Television": [
        "Movies",
        "TV Shows",
        "Blu-ray",
        "Prime Video",
        "4K Ultra HD",
        "Kids & Family",
        "Best Sellers",
        "New Releases",
        "Pre-orders",
        "Kids & Family"
    ],

    "Pet Supplies": [
        "Dogs",
        "Cats",
        "Fish & Aquatics",
        "Birds",
        "Horses",
        "Reptiles & Amphibians",
        "Small Animals",
    ],

    "Software": [
        "Accounting & Finance",
        "Antivirus & Security",
        "Business & Office",
        "Children's",
        "Design & Illustration",
        "Digital Software",
        "Education & Reference",
        "Games",
        "Lifestyle & Hobbies",
        "Music",
        "Networking & Servers",
        "Operating Systems",
        "Photography",
        "Programming & Web Development",
        "Tax Preparation",
        "Utilities",
        "Video"
    ],

    "Sports & Outdoors": [
        "Sports and Outdoors",
        "Outdoor Recreation",
        "Sports & Fitness",

    ],

    "Tools & Home Improvement": [
        "Tools & Home Improvement",
        "Appliances",
        "Building Supplies",
        "Electrical",
        "Hardware",
        "Kitchen & Bath Fixtures",
        "Light Bulbs",
        "Lighting & Ceiling Fans",
        "Measuring & Layout Tools",
        "Painting Supplies & Wall Treatments",
        "Power & Hand Tools",
        "Rough Plumbing",
        "Safety & Security",
        "Storage & Home Organization",
        "Welding & Soldering"
    ],

    "Toys & Games": [
        "Action Figures & Statues",
        "Arts & Crafts",
        "Baby & Toddler Toys",
        "Building Toys",
        "Dolls & Accessories",
        "Dress Up & Pretend Play",
        "Games",
        "Grown-Up Toys",
        "Hobbies",
        "Kids' Electronics",
        "Learning & Education",
        "Novelty & Gag Toys",
        "Party Supplies",
        "Puppets",
        "Puzzles",
        "Sports & Outdoor Play",
        "Stuffed Animals & Plush Toys",
        "Toy Remote Control & Play Vehicles",
        "Tricycles, Scooters & Wagons",
        "Video Games"
    ],

    "Video Games": [
        "PC",
        "PlayStation 4",
        "Xbox One",
        "Nintendo Switch",
        "Wii U",
        "Nintendo 3DS",
        "PlayStation 3",
        "Xbox 360",
        "Mac",
        "Nintendo DS",
        "PlayStation Vita",
        "Sony PSP",
        "Retro Gaming & Microconsoles",
        "Accessories",
        "Digital Games",
        "Kids & Family"
    ]
};

function generateCategoriesToScrape(categories: Record<string, string[]>): Category[] {
    const baseUrl = "https://www.amazon.com/s?k=";
    const categoriesToScrape: Category[] = [];

    for (const [categoryName, subcategories] of Object.entries(categories)) {
        const categoryObj: Category = {
            name: categoryName,
            subcategories: []
        };

        subcategories.forEach((subcategory: string) => {
            const subcategoryObj: Subcategory = {
                name: subcategory,
                url: `${baseUrl}${encodeURIComponent(subcategory)}`
            };

            categoryObj.subcategories.push(subcategoryObj);
        });

        categoriesToScrape.push(categoryObj);
    }

    return categoriesToScrape;
}

// categories URL
const categoriesToScrape = generateCategoriesToScrape(categories);

// console.log(JSON.stringify(categoriesToScrape, null, 2));

export { categoriesToScrape, categories, generateCategoriesToScrape };