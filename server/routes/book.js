const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('seller', 'name');
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('seller', 'name');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new book (seller only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { title, author, description, price, category, imageUrl, stock } = req.body;
    
    const book = new Book({
      title,
      author,
      description,
      price,
      category,
      imageUrl,
      stock,
      seller: req.user.id
    });
    
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a book (seller only)
router.put('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { title, author, description, price, category, imageUrl, stock } = req.body;
    
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.price = price || book.price;
    book.category = category || book.category;
    book.imageUrl = imageUrl || book.imageUrl;
    book.stock = stock || book.stock;
    
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get seller's books
router.get('/seller/inventory', auth, async (req, res) => {
  try {
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const books = await Book.find({ seller: req.user.id });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;