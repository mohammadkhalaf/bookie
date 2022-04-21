const createBook = async (req, res) => {
  res.send('create book');
};
const updateBook = async (req, res) => {
  res.send('update book');
};

const deleteBook = async (req, res) => {
  res.send('delete book');
};

const getAllBooks = async (req, res) => {
  res.send('get all books');
};
const getBooksStats = async (req, res) => {
  res.send('get stats');
};

export { createBook, getBooksStats, getAllBooks, deleteBook, updateBook };
