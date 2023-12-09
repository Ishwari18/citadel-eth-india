require('dotenv').config();
const express = require('express');

const app = express();
const port = 3001;

const headers = {
    "Authorization": process.env.AUTHORIZATION,
    "Content-Type": "application/json"
};

// Middleware to handle request bodies
app.use(express.json());

// // Middleware for URL validation
// app.use((req, res, next) => {
//     const url = req.query.url;

//     if (!url) {
//         return res.status(400).send("Include `url` in the query string or request body");
//     }
//     if (!url.startsWith("https://api.1inch.dev")) {
//         return res.status(400).send("Base URL must start with https://api.1inch.dev");
//     }
//     next();
// });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your actual frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.get('/', async (req, res) => {
    try {
        // Extract the base URL from the 'url' query parameter
        let baseUrl = req.query.url;

        // Reconstruct the URL with additional query parameters
        let additionalParams = Object.entries(req.query)
            .filter(([key, _]) => key !== 'url') // Exclude the 'url' parameter itself
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        if (additionalParams) {
            baseUrl += (baseUrl.includes('?') ? '&' : '?') + additionalParams;
        }

        const response = await fetch(baseUrl, { headers });
        const data = await response.json();
        return res.send(data);
    } catch (error) {
        return res.status(500).send('Error occurred while fetching data: ' + JSON.stringify(error));
    }
});

// Middleware to handle CORS preflight requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.get('/', async (req, res) => {
    try {
        const response = await fetch(req.query.url, { headers });
        const data = await response.json();
        return res.send(data);
    } catch (error) {
        return res.status(500).send('Error occurred while fetching data: ' + JSON.stringify(error));
    }
});

app.post('/', async (req, res) => {
    try {
        const response = await fetch(req.query.url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(req.body.data)
        });
        const data = await response.json();
        return res.send(data);
    } catch (error) {
        return res.status(500).send('Error occurred while fetching data: ' + JSON.stringify(error));
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});