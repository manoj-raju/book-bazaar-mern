import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get('/api/users/wishlist');
        setWishlistItems(res.data);
      } catch (err) {
        console.error('Error fetching wishlist', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (bookId) => {
    try {
      await axios.delete(`/api/users/wishlist/${bookId}`);
      setWishlistItems(wishlistItems.filter(item => item._id !== bookId));
    } catch (err) {
      console.error('Error removing from wishlist', err);
    }
  };

  const addToCart = async (bookId) => {
    try {
      await axios.post('/api/users/cart', { bookId, quantity: 1 });
      alert('Added to cart!');
    } catch (err) {
      console.error('Error adding to cart', err);
      alert(err.response?.data?.message || 'Error adding to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Your Wishlist</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Your wishlist is empty</p>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
        >
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Your Wishlist</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wishlistItems.map((book) => (
          <div key={book._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="flex items-start p-4">
              <div className="h-24 w-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
                {book.imageUrl ? (
                  <img 
                    src={book.imageUrl} 
                    alt={book.title} 
                    className="max-h-full max-w-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 dark:text-gray-500 text-xl">Book</div>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  <Link to={`/books/${book._id}`}>{book.title}</Link>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">by {book.author}</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-3">${book.price.toFixed(2)}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCart(book._id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-md text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(book._id)}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 py-1 px-3 rounded-md text-sm text-gray-800 dark:text-gray-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
