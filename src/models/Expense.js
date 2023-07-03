const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const expenseSchema = mongoose.Schema(
  {
    title: {
      required: [true, 'Title is required'],
      type: String,
    },
    description: {
      required: [true, 'description required'],
      type: String,
    },
    type: {
      type: String,
      default: 'expense',
    },
    amount: {
      required: [true, 'Amount is  required'],
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
  },
  {
    timestamp: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

expenseSchema.plugin(mongoosePaginate);

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
