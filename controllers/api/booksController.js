const axios = require('axios');

const getBooks = async (req, res) => {
    const query = req.query.q;
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    console.log(`Fetching books for query: ${query}`);

    try {
        const response = await axios.get(url);
        console.log('Books fetched successfully:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Google Books API:', error);
        res.status(500).json({ error: 'Error fetching data from Google Books API' });
    }
};


module.exports = {
    getBooks
};