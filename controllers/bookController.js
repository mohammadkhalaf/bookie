import Book from '../models/bookModel.js';
import mongoose from 'mongoose';
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
  const { id } = req.body;
  console.log(id);
  console.log(req.body);
  console.log('update function');

  const book = await Book.findOne({ _id: id });
  if (!book) {
    throw new Error('The book can not be found');
  }
  const updatedBook = await Book.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).send(updatedBook);
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const book = await Book.findOne({ _id: id });
  if (!book) {
    throw new Error('The book can not be found');
  }
  await Book.findByIdAndDelete({ _id: id });

  res.status(200).send('Item deleted successfully');
};

const getAllBooks = async (req, res) => {
  const books = await Book.find({ createdBy: req.user.userId });
  res.status(200).json(books);
};
const getBooksStats = async (req, res) => {
  let stats = await Book.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$genre', count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((total, cur) => {
    const { _id, count } = cur;
    total[_id] = count;

    return total;
  }, {});

  res.json({ stats });
};

export { createBook, getBooksStats, getAllBooks, deleteBook, updateBook };
