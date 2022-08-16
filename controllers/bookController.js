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
  const { search } = req.query;
  console.log(search);

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.title = { $regex: search, $options: 'i' };
  }

  let result = Book.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const books = await result;

  const totalBooks = await Book.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalBooks / limit);

  res.status(200).json({ books, totalBooks, numOfPages });
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
