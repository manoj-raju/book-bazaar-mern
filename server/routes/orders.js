const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// Place order
router.post('/', auth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const user = await User.findById(req.user.id).populate('cart.book');
    if (user.cart.length === 0) return res.status(400).json({ message: 'Cart is empty' });
    
    // Calculate total amount and build order items
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of user.cart) {
      const book = item.book;
      const quantity = item.quantity;
      
      if (book.stock < quantity) {
        throw new Error(`Not enough stock for ${book.title}`);
      }
      
      totalAmount += book.price * quantity;
      orderItems.push({
        book: book._id,
        quantity,
        price: book.price
      });
      
      // Update book stock
      await Book.findByIdAndUpdate(
        book._id,
        { $inc: { stock: -quantity } },
        { session }
      );
      
      // Add funds to seller's wallet
      await User.findByIdAndUpdate(
        book.seller,
        { $inc: { wallet: book.price * quantity } },
        { session }
      );
    }
    
    // Check if user has enough funds
    if (user.wallet < totalAmount) {
      throw new Error('Insufficient funds');
    }
    
    // Deduct from user's wallet
    user.wallet -= totalAmount;
    user.cart = [];
    await user.save({ session });
    
    // Create order
    const order = new Order({
      user: req.user.id,
      items: orderItems,
      totalAmount
    });
    
    await order.save({ session });
    await session.commitTransaction();
    
    res.status(201).json(order);
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.book')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get seller orders
router.get('/seller', auth, async (req, res) => {
  try {
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Find all orders containing books from this seller
    const orders = await Order.find({
      'items.book': { $in: await Book.find({ seller: req.user.id }).select('_id') }
    }).populate('items.book user');
    
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;