import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Category from './models/Category.js';
import Product from './models/Product.js';
import Review from './models/Review.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected for Seeding');

        // Clear existing data
        await User.deleteMany({});
        await Category.deleteMany({});
        await Product.deleteMany({});
        await Review.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // ─── Seed Users ─────────────────────────────────
        const users = await User.create([
            {
                username: 'user',
                email: 'user@shinvo.com',
                password: 'password',
                role: 'user'
            },
            {
                username: 'admin',
                email: 'admin@shinvo.com',
                password: 'admin123',
                role: 'admin'
            }
        ]);
        console.log('👤 Users seeded');

        // ─── Seed Categories ────────────────────────────
        const categories = await Category.create([
            { name: 'Smart Watch', image: 'https://placehold.co/400x400/1c1c1c/FFFFFF?text=Smart+Watch' },
            { name: 'Power Bank', image: 'https://placehold.co/400x400/1c1c1c/FFFFFF?text=Power+Bank' },
            { name: 'Charger', image: 'https://placehold.co/400x400/1c1c1c/FFFFFF?text=Charger' },
            { name: 'Earbuds', image: 'https://placehold.co/400x400/1c1c1c/FFFFFF?text=Earbuds' },
            { name: 'Phone Case', image: 'https://placehold.co/400x400/1c1c1c/FFFFFF?text=Phone+Case' },
            { name: 'Mobile Holder', image: 'https://placehold.co/400x400/1c1c1c/FFFFFF?text=Mobile+Holder' },
        ]);

        // Create a lookup map for categories
        const catMap = {};
        categories.forEach(c => { catMap[c.name] = c._id; });
        console.log('📂 Categories seeded');

        // ─── Seed Products ──────────────────────────────
        const products = await Product.create([
            // Chargers
            {
                title: 'Samsung 45W Travel Adapter (Super Fast Charging 2.0)',
                brand: 'Samsung',
                description: 'Unlock the full potential of your device with the Samsung 45W Travel Adapter. Designed specifically for the Galaxy S-Series, this adapter takes your battery from 0% to 65% in just 30 minutes.',
                price: 6500,
                category: catMap['Charger'],
                images: [
                    'https://placehold.co/600x600/f0f0f0/333333?text=Samsung+45W+1',
                    'https://placehold.co/600x600/f0f0f0/333333?text=Samsung+45W+2',
                    'https://placehold.co/600x600/f0f0f0/333333?text=Samsung+45W+3',
                    'https://placehold.co/600x600/f0f0f0/333333?text=Samsung+45W+4',
                    'https://placehold.co/600x600/f0f0f0/333333?text=Samsung+45W+5',
                ],
                colors: ['Black', 'White'],
                powerOptions: ['25W', '45W', '65W'],
                features: [
                    'Support fast protocols (PD, QC)',
                    'Super Fast Charging 2.0 (45W)',
                    'Supports PD (Power Delivery) & QC Protocols',
                    'USB-C Interface',
                    'Official Samsung Product'
                ],
                specifications: {
                    Brand: 'Samsung',
                    Model: 'EP-T4510',
                    'Max Output': '45 Watts',
                    Interface: 'USB Type-C',
                    'Input Voltage': '100-240V (Global Support)',
                    'Charging Standards': 'PD 3.0 (PPS), Quick Charge 2.0',
                    Color: 'Black / White',
                    'In the Box': '45W Adapter + 5A C-to-C Cable (1m)'
                },
                stock: 50,
                rating: 4.8,
                numReviews: 120,
                isBestseller: true,
                isNewArrival: false
            },
            {
                title: 'UGREEN Nexode 45W Charger',
                brand: 'UGREEN',
                description: 'Compact GaN charger with 45W output. USB-C port with PD 3.0 support for fast charging any device.',
                price: 4500,
                category: catMap['Charger'],
                images: [
                    'https://placehold.co/600x600/f0f0f0/333333?text=UGREEN+45W+1',
                    'https://placehold.co/600x600/f0f0f0/333333?text=UGREEN+45W+2',
                ],
                colors: ['Black', 'Gray'],
                powerOptions: ['45W'],
                features: [
                    'GaN Technology',
                    '45W PD 3.0 Output',
                    'Compact & Lightweight',
                    'Universal Compatibility'
                ],
                stock: 80,
                rating: 4.6,
                numReviews: 85,
                isBestseller: true,
                isNewArrival: false
            },

            // Phone Cases
            {
                title: 'Google Pixel Transparent Magsafe Case',
                brand: 'Google',
                description: 'Premium transparent case with MagSafe compatibility for Google Pixel. Crystal clear design showcases your phone.',
                price: 2500,
                category: catMap['Phone Case'],
                images: [
                    'https://placehold.co/600x600/f0f0f0/333333?text=Pixel+Case+1',
                    'https://placehold.co/600x600/f0f0f0/333333?text=Pixel+Case+2',
                ],
                colors: ['Clear', 'Clear Black'],
                features: [
                    'MagSafe Compatible',
                    'Crystal Clear Design',
                    'Scratch Resistant',
                    'Slim Profile'
                ],
                stock: 100,
                rating: 4.5,
                numReviews: 60,
                isBestseller: true,
                isNewArrival: false
            },
            {
                title: 'Samsung Galaxy S24 Ultra Case',
                brand: 'Samsung',
                description: 'Official Samsung clear case for Galaxy S24 Ultra with enhanced grip and slim design.',
                price: 2000,
                category: catMap['Phone Case'],
                images: [
                    'https://placehold.co/400x400/202020/FFFFFF?text=S24+Case+Black',
                    'https://placehold.co/400x400/DC2626/FFFFFF?text=S24+Case+Red',
                ],
                colors: ['Black', 'Red'],
                features: [
                    'Official Samsung Product',
                    'Enhanced Grip',
                    'Slim Design',
                    'Anti-Yellowing'
                ],
                stock: 150,
                rating: 4.3,
                numReviews: 45,
                isBestseller: false,
                isNewArrival: true
            },
            {
                title: 'iPhone 16 Pro Max Silicone Case',
                brand: 'Apple',
                description: 'Soft-touch silicone case with MagSafe for iPhone 16 Pro Max. Available in multiple vibrant colors.',
                price: 3000,
                category: catMap['Phone Case'],
                images: [
                    'https://placehold.co/400x400/202020/FFFFFF?text=iPhone+Case+Black',
                    'https://placehold.co/400x400/DC2626/FFFFFF?text=iPhone+Case+Red',
                ],
                colors: ['Black', 'Red', 'Blue', 'White'],
                features: [
                    'MagSafe Compatible',
                    'Soft Touch Silicone',
                    'Microfiber Lining',
                    'Wireless Charging Support'
                ],
                stock: 200,
                rating: 4.7,
                numReviews: 95,
                isBestseller: false,
                isNewArrival: true
            },
            {
                title: 'Xiaomi Redmi Note 13 Pro Case',
                brand: 'Xiaomi',
                description: 'Shockproof protective case for Xiaomi Redmi Note 13 Pro with carbon fiber texture.',
                price: 1200,
                category: catMap['Phone Case'],
                images: [
                    'https://placehold.co/400x400/202020/FFFFFF?text=Xiaomi+Case',
                ],
                colors: ['Black'],
                features: [
                    'Carbon Fiber Texture',
                    'Shockproof Protection',
                    'Raised Camera Ring',
                    'Anti-Slip Design'
                ],
                stock: 120,
                rating: 4.2,
                numReviews: 30,
                isBestseller: false,
                isNewArrival: true
            },
            {
                title: 'Vivo V30 Pro Premium Case',
                brand: 'Vivo',
                description: 'Elegantly designed premium case for Vivo V30 Pro with metal frame reinforcement.',
                price: 1500,
                category: catMap['Phone Case'],
                images: [
                    'https://placehold.co/400x400/202020/FFFFFF?text=Vivo+Case',
                ],
                colors: ['Black', 'Blue'],
                features: [
                    'Metal Frame Reinforcement',
                    'Premium Build Quality',
                    'Raised Bezel Protection',
                ],
                stock: 90,
                rating: 4.1,
                numReviews: 22,
                isBestseller: false,
                isNewArrival: true
            },

            // Mobile Holder
            {
                title: 'Suction Magnetic Mobile Holder',
                brand: 'Baseus',
                description: 'Strong suction cup mount with magnetic attachment. Perfect for car dashboard or windshield use.',
                price: 1800,
                category: catMap['Mobile Holder'],
                images: [
                    'https://placehold.co/600x600/f0f0f0/333333?text=Mobile+Holder+1',
                    'https://placehold.co/600x600/f0f0f0/333333?text=Mobile+Holder+2',
                ],
                colors: ['Black'],
                features: [
                    'Strong Suction Cup',
                    'Magnetic Attachment',
                    '360° Rotation',
                    'Universal Compatibility'
                ],
                stock: 70,
                rating: 4.4,
                numReviews: 55,
                isBestseller: true,
                isNewArrival: false
            },

            // Power Banks
            {
                title: 'Baseus Bipow 22.5W 20000mAh Power Bank',
                brand: 'Baseus',
                description: 'High-capacity 20000mAh power bank with 22.5W fast charging. Dual USB-A and USB-C output ports.',
                price: 5500,
                originalPrice: 7000,
                category: catMap['Power Bank'],
                images: [
                    'https://placehold.co/600x600/c6c7c8/333333?text=Baseus+PB+1',
                    'https://placehold.co/600x600/c6c7c8/333333?text=Baseus+PB+2',
                ],
                colors: ['Black', 'White'],
                features: [
                    '22.5W Fast Charging',
                    '20000mAh Capacity',
                    'Dual Output Ports',
                    'LED Display',
                    'Airline Safe'
                ],
                stock: 60,
                rating: 4.5,
                numReviews: 78,
                isBestseller: false,
                isNewArrival: true
            },

            // Smart Watch
            {
                title: 'Smart Band Pro Fitness Tracker',
                brand: 'Xiaomi',
                description: 'Advanced fitness tracker with heart rate monitoring, sleep tracking, and 14-day battery life.',
                price: 8500,
                category: catMap['Smart Watch'],
                images: [
                    'https://placehold.co/600x600/c6c7c8/333333?text=Smart+Band+1',
                    'https://placehold.co/600x600/c6c7c8/333333?text=Smart+Band+2',
                ],
                colors: ['Black', 'Blue', 'Pink'],
                features: [
                    'Heart Rate Monitor',
                    'Sleep Tracking',
                    '14-Day Battery Life',
                    'Water Resistant IP68',
                    'AMOLED Display'
                ],
                stock: 45,
                rating: 4.6,
                numReviews: 110,
                isBestseller: false,
                isNewArrival: true
            },

            // Earbuds
            {
                title: 'Samsung Galaxy Buds3 Pro',
                brand: 'Samsung',
                description: 'Premium wireless earbuds with active noise cancellation, 360 Audio, and 30-hour total battery life.',
                price: 12000,
                category: catMap['Earbuds'],
                images: [
                    'https://placehold.co/600x600/f0f0f0/333333?text=Galaxy+Buds+1',
                    'https://placehold.co/600x600/f0f0f0/333333?text=Galaxy+Buds+2',
                ],
                colors: ['Black', 'White', 'Purple'],
                features: [
                    'Active Noise Cancellation',
                    '360 Audio',
                    '30-Hour Battery Life',
                    'IP57 Water Resistant',
                    'Hi-Fi Audio Quality'
                ],
                stock: 35,
                rating: 4.7,
                numReviews: 92,
                isBestseller: false,
                isNewArrival: true
            },
        ]);
        console.log(`📦 ${products.length} Products seeded`);

        // ─── Seed Reviews for Samsung 45W Adapter ───────
        const samsungAdapter = products[0];
        const demoUser = users[0];

        await Review.create([
            {
                user: demoUser._id,
                product: samsungAdapter._id,
                rating: 5,
                title: 'Absolutely love this product!',
                text: 'The charger is incredibly fast. My S24 Ultra charges from 0 to 65% in 30 minutes. Totally worth every penny.',
                images: []
            }
        ]);
        console.log('⭐ Reviews seeded');

        console.log('\n✅ Database seeded successfully!');
        console.log('──────────────────────────────────');
        console.log('Demo User:  user@shinvo.com / password');
        console.log('Admin User: admin@shinvo.com / admin123');
        console.log('──────────────────────────────────');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding Error:', error.message);
        process.exit(1);
    }
};

seedDatabase();
