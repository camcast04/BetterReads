const axios = require('axios');

const getBooks = async (req, res) => {
    const query = req.query.q;
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Google Books API' });
    }
};

module.exports = {
    getBooks
};