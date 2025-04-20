const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, default: 'default-book.jpg' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stock: { type: Number, default: 1, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);
