require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key

const app = express();

// Allow CORS for local development and production
app.use(cors({
    origin: [
        'http://127.0.0.1:5500',
        'http://localhost:3000',
        'https://ravlink.ca'
    ],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json()); // Automatically parse JSON bodies

// Endpoint to create Stripe checkout session
app.post('/create-checkout-session', async (req, res) => {
    // Allow flexible content-type check
    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('application/json')) {
        return res.status(400).json({ error: 'Invalid Content-Type. Expected application/json.' });
    }

    const { productName, productDescription, productPrice } = req.body;

    // Validate required fields
    if (!productName || !productDescription || !productPrice) {
        return res.status(400).json({ error: 'Missing required fields: productName, productDescription, or productPrice.' });
    }

    if (!process.env.STRIPE_SECRET_KEY || !process.env.SUCCESS_URL || !process.env.CANCEL_URL) {
        return res.status(500).json({ error: 'Stripe configuration is missing in environment variables.' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: productName,
                            description: productDescription,
                        },
                        unit_amount: Math.round(productPrice * 100), // Convert to cents and round
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: process.env.SUCCESS_URL,
            cancel_url: process.env.CANCEL_URL,
        });

        console.log('Checkout session created:', session.id);
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
