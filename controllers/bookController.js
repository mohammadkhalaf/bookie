import Book from '../models/bookModel.js';
import mongoose from 'mongoose';
import moment from 'moment';
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

  res.status(200).json({ books, totalBooks: Book.length, numOfPages: 1 });
};
const getBooksStats = async (req, res) => {
  let stats = await Book.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$genre', Total: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, cur) => {
    const { _id, Total } = cur;
    acc[_id] = Total;
    return acc;
  }, {});
  const defaultStats = {
    fiction: stats.fiction || 0,
    nonfiction: stats.nonfiction || 0,
  };

  let monthlyStats = await Book.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        Total: { $sum: 1 },
      },
    },

    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);
  monthlyStats = monthlyStats
    .map((item) => {
      const {
        _id: { year, month },
        Total,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, Total };
    })
    .reverse();
  res.status(200).json({ defaultStats, monthlyStats });
};

export { createBook, getBooksStats, getAllBooks, deleteBook, updateBook };
