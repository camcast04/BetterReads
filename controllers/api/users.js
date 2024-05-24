// better-reads/controllers/api/users.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const Book = require('../../models/book');
const List = require('../../models/list');
const axios = require('axios');

module.exports = {
  create,
  login,
  createList,
  addBookToList,
  getLists,
  updateUser,
  getUser, 
  getListByName,
};

async function create(req, res) {
  try {
    const user = await User.create(req.body);

    const defaultLists = ['Read', 'To Read', 'DNF', 'Favorites'].map(
      (listName) => ({
        listName,
        user: user._id,
        books: [],
        is_default: true,
      })
    );

    const createdLists = await List.insertMany(defaultLists);

    user.lists = createdLists.map((list) => list._id);
    await user.save();

    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error('User not found');
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error('Invalid password');
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.error('Login error:', err);
    res.status(400).json({ message: err.message });
  }
}

async function createList(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) throw new Error('User not found');

    const newList = new List({
      listName: req.params.listName,
      user: user._id,
      books: [],
    });

    if (req.body.bookId) {
      const book = await Book.findById(req.body.bookId);
      if (!book) throw new Error('Book not found');
      newList.books.push(book);
    }

    await newList.save();
    user.lists.push(newList._id);
    await user.save();

    res.json(newList);
  } catch (err) {
    console.error('Error creating list:', err);
    res.status(400).json({ message: err.message });
  }
}
// THIS ONE PREVIOUSLY WORKED... I THINK
// async function addBookToList(req, res) {
//   console.log('addBookToList called');
//   try {
//     console.log(`User ID from token: ${req.user._id}`);

//     const user = await User.findById(req.user._id).populate('lists').exec();
//     if (!user) throw new Error('User not found');
//     console.log('User found:', JSON.stringify(user, null, 2));

//     const list = await List.findOne({
//       _id: { $in: user.lists },
//       listName: req.params.listName,
//     }).populate('books');
//     if (!list) throw new Error('List not found');
//     console.log('List found:', JSON.stringify(list, null, 2));

//     const bookId = req.body.bookId;
//     console.log(`Book ID to add: ${bookId}`);
    
//     const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
//     const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;
//     console.log('Fetching book data from Google Books API with URL:', url);

//     const response = await axios.get(url);
//     const bookData = response.data;
//     console.log('Book data fetched:', JSON.stringify(bookData, null, 2));

//     let book = await Book.findOne({ googleBooksId: bookId });
//     if (!book) {
//       console.log('Book not found in database. Creating new book entry.');
//       book = new Book({
//         googleBooksId: bookId,
//         title: bookData.volumeInfo.title,
//         authors: bookData.volumeInfo.authors,
//         publisher: bookData.volumeInfo.publisher,
//         publishedDate: bookData.volumeInfo.publishedDate,
//         description: bookData.volumeInfo.description,
//         coverImage: bookData.volumeInfo.imageLinks?.thumbnail,
//       });
//       await book.save();
//       console.log('New book created and saved:', JSON.stringify(book, null, 2));
//     } else {
//       console.log('Book already exists in database:', JSON.stringify(book, null, 2));
//     }

//     const isBookInList = list.books.some(b => b.equals(book._id));
//     console.log(`Is book already in list: ${isBookInList}`);
//     if (!isBookInList) {
//       console.log(`Adding book ${book._id} to list ${list._id}`);
//       list.books.push(book._id);
//       await list.save();
//       console.log('List saved after adding book:', JSON.stringify(list, null, 2));
//     } else {
//       console.log('Book already in list, not adding again.');
//     }

//     // Explicitly populate the books array before sending the response
//     console.log(`Populating books for list ${list._id} after save...`);
//     const updatedList = await List.findById(list._id).populate('books').exec();
//     console.log('Updated list after populating books:', JSON.stringify(updatedList, null, 2));

//     res.json(updatedList);
//   } catch (err) {
//     console.error('Error adding book to list:', err);
//     res.status(400).json({ message: err.message });
//   }
// }

// async function getLists(req, res) {
//   try {
//     const user = await User.findById(req.user._id).populate('lists').exec();
//     if (!user) throw new Error('User not found');

//     const lists = await List.find({ user: user._id }).populate('books').exec();
//     res.json(lists);
//   } catch (err) {
//     console.error('Error fetching all lists:', err);
//     res.status(400).json({ message: err.message });
//   }
// }

//TESTING THIS ONE OUT
async function addBookToList(req, res) {
  console.log('addBookToList called');
  try {
    console.log(`User ID from token: ${req.user._id}`);

    const user = await User.findById(req.user._id).populate('lists').exec();
    if (!user) throw new Error('User not found');
    console.log('User found:', JSON.stringify(user, null, 2));

    const list = await List.findOne({
      _id: { $in: user.lists },
      listName: req.params.listName,
    }).populate('books');
    if (!list) throw new Error('List not found');
    console.log('List found:', JSON.stringify(list, null, 2));

    const bookId = req.body.bookId;
    console.log(`Book ID to add: ${bookId}`);
    
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;
    console.log('Fetching book data from Google Books API with URL:', url);

    const response = await axios.get(url);
    const bookData = response.data;
    console.log('Book data fetched:', JSON.stringify(bookData, null, 2));

    let book = await Book.findOne({ googleBooksId: bookId });
    if (!book) {
      console.log('Book not found in database. Creating new book entry.');
      book = new Book({
        googleBooksId: bookId,
        title: bookData.volumeInfo.title,
        authors: bookData.volumeInfo.authors,
        publisher: bookData.volumeInfo.publisher,
        publishedDate: bookData.volumeInfo.publishedDate,
        description: bookData.volumeInfo.description,
        coverImage: bookData.volumeInfo.imageLinks?.thumbnail,
      });
      await book.save();
      console.log('New book created and saved:', JSON.stringify(book, null, 2));
    } else {
      console.log('Book already exists in database:', JSON.stringify(book, null, 2));
    }

    const isBookInList = list.books.some(b => b.equals(book._id));
    console.log(`Is book already in list: ${isBookInList}`);
    if (!isBookInList) {
      console.log(`Adding book ${book._id} to list ${list._id}`);
      list.books.push(book._id);
      await list.save();
      console.log('List saved after adding book:', JSON.stringify(list, null, 2));
    } else {
      console.log('Book already in list, not adding again.');
    }

    // Explicitly populate the books array before sending the response
    console.log(`Populating books for list ${list._id} after save...`);
    const updatedList = await List.findById(list._id).populate('books').exec();
    console.log('Updated list after populating books:', JSON.stringify(updatedList, null, 2));

    res.json(updatedList);
  } catch (err) {
    console.error('Error adding book to list:', err);
    res.status(400).json({ message: err.message });
  }
}


async function getLists(req, res) {
  try {
    const user = await User.findById(req.user._id).exec();
    if (!user) throw new Error('User not found');

    const lists = await List.find({ user: user._id })
      .populate({
        path: 'books',
        select: 'googleBooksId title authors publisher',
      })
      .exec();

    res.json(lists);
  } catch (err) {
    console.error('Error fetching all lists:', err);
    res.status(400).json({ message: err.message });
  }
}

async function getListByName(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'lists',
        populate: { path: 'books' },
      })
      .exec();
    if (!user) throw new Error('User not found');

    const list = user.lists.find(
      (list) => list.listName === req.params.listName
    );

    if (!list) throw new Error('List not found');

    res.json(list);
  } catch (err) {
    console.error('Error fetching list by name:', err);
    res.status(400).json({ message: err.message });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) throw new Error('User not found');
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(400).json({ message: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new Error('User not found');

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;

    await user.save();

    const token = createJWT(user); // Create a new token with updated user data
    res.json({ user, token }); // Send updated user data and new token to the client

  } catch (err) {
    console.error('Error updating user:', err);
    res.status(400).json({ message: err.message });
  }
}

function createJWT(user) {
  return jwt.sign(
    { user: { _id: user._id, name: user.name, email: user.email } },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}





// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../../models/user');
// const Book = require('../../models/book');
// const List = require('../../models/list');
// const axios = require('axios');

// module.exports = {
//   create,
//   login,
//   createList,
//   addBookToList,
//   getLists,
//   updateUser,
//   getUser, 
//   getListByName,
// };

// async function create(req, res) {
//   try {
//     const user = await User.create(req.body);

//     const defaultLists = ['Read', 'To Read', 'DNF', 'Favorites'].map(
//       (listName) => ({
//         listName,
//         user: user._id,
//         books: [],
//         is_default: true,
//       })
//     );

//     const createdLists = await List.insertMany(defaultLists);

//     user.lists = createdLists.map((list) => list._id);
//     await user.save();

//     const token = createJWT(user);
//     res.json(token);
//   } catch (err) {
//     console.error('Error creating user:', err);
//     res.status(400).json({ message: err.message });
//   }
// }

// async function login(req, res) {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) throw new Error('User not found');
//     const match = await bcrypt.compare(req.body.password, user.password);
//     if (!match) throw new Error('Invalid password');
//     const token = createJWT(user);
//     res.json(token);
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(400).json({ message: err.message });
//   }
// }

// async function createList(req, res) {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) throw new Error('User not found');

//     const newList = new List({
//       listName: req.params.listName,
//       user: user._id,
//       books: [],
//     });

//     if (req.body.bookId) {
//       const book = await Book.findById(req.body.bookId);
//       if (!book) throw new Error('Book not found');
//       newList.books.push(book);
//     }

//     await newList.save();
//     user.lists.push(newList._id);
//     await user.save();

//     res.json(newList);
//   } catch (err) {
//     console.error('Error creating list:', err);
//     res.status(400).json({ message: err.message });
//   }
// }

// async function addBookToList(req, res) {
//   console.log('addBookToList called');
//   try {
//     console.log(`User ID from token: ${req.user._id}`);

//     const user = await User.findById(req.user._id).populate('lists').exec();
//     if (!user) throw new Error('User not found');
//     console.log('User found:', JSON.stringify(user, null, 2));

//     const list = await List.findOne({
//       _id: { $in: user.lists },
//       listName: req.params.listName,
//     }).populate('books');
//     if (!list) throw new Error('List not found');
//     console.log('List found:', JSON.stringify(list, null, 2));

//     const bookId = req.body.bookId;
//     console.log(`Book ID to add: ${bookId}`);
    
//     const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
//     const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;
//     console.log('Fetching book data from Google Books API with URL:', url);

//     const response = await axios.get(url);
//     const bookData = response.data;
//     console.log('Book data fetched:', JSON.stringify(bookData, null, 2));

//     let book = await Book.findOne({ googleBooksId: bookId });
//     if (!book) {
//       console.log('Book not found in database. Creating new book entry.');
//       book = new Book({
//         googleBooksId: bookId,
//         title: bookData.volumeInfo.title,
//         authors: bookData.volumeInfo.authors,
//         publisher: bookData.volumeInfo.publisher,
//         publishedDate: bookData.volumeInfo.publishedDate,
//         description: bookData.volumeInfo.description,
//         coverImage: bookData.volumeInfo.imageLinks?.thumbnail,
//       });
//       await book.save();
//       console.log('New book created and saved:', JSON.stringify(book, null, 2));
//     } else {
//       console.log('Book already exists in database:', JSON.stringify(book, null, 2));
//     }

//     const isBookInList = list.books.some(b => b.equals(book._id));
//     console.log(`Is book already in list: ${isBookInList}`);
//     if (!isBookInList) {
//       console.log(`Adding book ${book._id} to list ${list._id}`);
//       list.books.push(book._id);
//       await list.save();
//       console.log('List saved after adding book:', JSON.stringify(list, null, 2));
//     } else {
//       console.log('Book already in list, not adding again.');
//     }

//     // Explicitly populate the books array before sending the response
//     console.log(`Populating books for list ${list._id} after save...`);
//     const updatedList = await List.findById(list._id).populate('books').exec();
//     console.log('Updated list after populating books:', JSON.stringify(updatedList, null, 2));

//     res.json(updatedList);
//   } catch (err) {
//     console.error('Error adding book to list:', err);
//     res.status(400).json({ message: err.message });
//   }
// }



// async function getLists(req, res) {
//   try {
//     const user = await User.findById(req.user._id).populate('lists').exec();
//     if (!user) throw new Error('User not found');

//     const lists = await List.find({ user: user._id }).populate('books').exec();
//     res.json(lists);
//   } catch (err) {
//     console.error('Error fetching all lists:', err);
//     res.status(400).json({ message: err.message });
//   }
// }

// async function getListByName(req, res) {
//   try {
//     const user = await User.findById(req.user._id)
//       .populate({
//         path: 'lists',
//         populate: { path: 'books' },
//       })
//       .exec();
//     if (!user) throw new Error('User not found');

//     const list = user.lists.find(
//       (list) => list.listName === req.params.listName
//     );

//     if (!list) throw new Error('List not found');

//     res.json(list);
//   } catch (err) {
//     console.error('Error fetching list by name:', err);
//     res.status(400).json({ message: err.message });
//   }
// }

// async function getUser(req, res) {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) throw new Error('User not found');
//     res.json(user);
//   } catch (err) {
//     console.error('Error fetching user:', err);
//     res.status(400).json({ message: err.message });
//   }
// }

// async function updateUser(req, res) {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) throw new Error('User not found');

//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.avatar = req.body.avatar || user.avatar;

//     await user.save();

//     const token = createJWT(user); // Create a new token with updated user data
//     res.json({ user, token }); // Send updated user data and new token to the client

//   } catch (err) {
//     console.error('Error updating user:', err);
//     res.status(400).json({ message: err.message });
//   }
// }

// function createJWT(user) {
//   return jwt.sign(
//     { user: { _id: user._id, name: user.name, email: user.email } },
//     process.env.SECRET,
//     { expiresIn: '24h' }
//   );
// }
