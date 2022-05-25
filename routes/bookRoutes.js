import express from 'express';

const router = express.Router();
import {
  createBook,
  getBooksStats,
  getAllBooks,
  deleteBook,
  updateBook,
} from '../controllers/bookController.js';

router
  .route('/')
  .post(createBook)
  .get(getAllBooks)
  .delete(deleteBook)
  .patch(updateBook);
router.route('/stats').get(getBooksStats);
// router.route('/:id')

export default router;
