const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Deakin University, Burood Campus');
});

// About Us route
app.get('/about', (req, res) => {
    res.send('About Us: Deakin University is a public university in Victoria, Australia.');
});

// Add two numbers route
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send('Invalid numbers provided.');
    }
    const sum = num1 + num2;
    res.send(`The sum of ${num1} and ${num2} is ${sum}.`);
});

// Fetch user data from the API and handle errors
app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching user data.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});