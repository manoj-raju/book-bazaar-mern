const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// Get user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to cart
router.post('/cart', auth, async (req, res) => {
  try {
    const { bookId, quantity } = req.body;
    
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.stock < quantity) return res.status(400).json({ message: 'Not enough stock' });
    
    const user = await User.findById(req.user.id);
    
    // Check if book already in cart
    const cartItemIndex = user.cart.findIndex(item => item.book.toString() === bookId);
    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ book: bookId, quantity });
    }
    
    await user.save();
    res.json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get cart
router.get('/cart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.book');
    res.json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to wishlist
router.post('/wishlist', auth, async (req, res) => {
  try {
    const { bookId } = req.body;
    
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    const user = await User.findById(req.user.id);
    
    if (user.wishlist.includes(bookId)) {
      return res.status(400).json({ message: 'Book already in wishlist' });
    }
    
    user.wishlist.push(bookId);
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get wishlist
router.get('/wishlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.json(user.wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add funds to wallet
router.post('/wallet/add', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
    
    const user = await User.findById(req.user.id);
    user.wallet += amount;
    await user.save();
    
    res.json({ wallet: user.wallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
