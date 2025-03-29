require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use environment variable for Stripe key

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'https://ravlink.ca'], // Allow local development and live domain
    methods: ['GET', 'POST'], // Ensure POST method is allowed
}));

app.post('/create-checkout-session', async (req, res) => {
    // Ensure the endpoint is correctly configured to handle POST requests
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(400).json({ error: 'Invalid Content-Type. Expected application/json.' });
    }

    const { productName, productDescription, productPrice } = req.body;

    if (!productName || !productDescription || !productPrice) {
        return res.status(400).json({ error: 'Missing required fields: productName, productDescription, or productPrice.' });
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
                        unit_amount: productPrice * 100, // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: process.env.SUCCESS_URL, // Use environment variable for success URL
            cancel_url: process.env.CANCEL_URL, // Use environment variable for cancel URL
        });

        console.log('Checkout session created:', session.id); // Log session ID
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error.message); // Log error
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));

