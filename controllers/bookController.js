import Book from '../models/bookModel.js';
const createBook = async (req, res) => {
  const { title, pages } = req.body;

  if (!title || !pages) {
    res.status(400);
    throw new Error('Please provide all values');
  }
  req.body.createdBy = req.user.userId;
  const book = await Book.create(req.body);
  res.status(201).json(book);
};
const updateBook = async (req, res) => {
  res.send('update book');
};

const deleteBook = async (req, res) => {
  res.send('delete book');
};

const getAllBooks = async (req, res) => {
  const books = await Book.find({ createdBy: req.user.userId });
  res.status(200).json(books);
};
const getBooksStats = async (req, res) => {
  res.send('get stats');
};

export { createBook, getBooksStats, getAllBooks, deleteBook, updateBook };
