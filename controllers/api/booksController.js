const axios = require('axios');
const Book = require('../../models/book');

const getBooks = async (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Google Books API:', error);
    res
      .status(500)
      .json({ error: 'Error fetching data from Google Books API' });
  }
};

const getBookDetails = async (req, res) => {
  const { bookId } = req.params;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const bookData = response.data;
    res.json({
      title: bookData.volumeInfo.title,
      authors: bookData.volumeInfo.authors,
      publisher: bookData.volumeInfo.publisher,
      publishedDate: bookData.volumeInfo.publishedDate,
      description: bookData.volumeInfo.description,
      coverImage: bookData.volumeInfo.imageLinks?.thumbnail,
    });
  } catch (error) {
    console.error('Error fetching book details from Google Books API:', error);
    res
      .status(500)
      .json({ error: 'Error fetching book details from Google Books API' });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, authors, description, datePublished, bookCover } = req.body;
    const book = new Book({
      title,
      authors,
      description,
      datePublished,
      bookCover,
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getBooks,
  getBookDetails,
  createBook,
};
