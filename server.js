const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('STRIPE_SECRET_KEY');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'https://ravlink.ca'], // Allow local development and live domain
}));

app.post('/create-checkout-session', async (req, res) => {
    const { productName, productDescription, productPrice } = req.body;

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
            success_url: 'https://ravlink.ca/success.html', // Replace with your live success URL
            cancel_url: 'https://ravlink.ca/cancel.html', // Replace with your live cancel URL
        });

        console.log('Checkout session created:', session.id); // Log session ID
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error.message); // Log error
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));

