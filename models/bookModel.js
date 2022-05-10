import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please Provide name'],
      minlength: 2,
      maxlength: '30',
      trim: true,
    },
    author: {
      type: String,

      minlength: 2,
      maxlength: '30',
      trim: true,
    },

    genre: {
      enum: ['fiction', 'nonfiction'],
    },
    pages: {
      type: Number,
    },
    hasRead: {
      type: Number,
      default: 0,
    },
    cover: {
      type: String,
      default: '',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user '],
    },
    isReading: false,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Book', BookSchema);
