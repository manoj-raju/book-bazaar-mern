import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const BookItem = ({ book }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [isWishlisted, setIsWishlisted] = useState(
    user?.wishlist?.some(item => item === book._id)
  );

  const addToWishlist = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    try {
      await axios.post('/api/users/wishlist', { bookId: book._id });
      setIsWishlisted(true);
    } catch (err) {
      console.error('Error adding to wishlist', err);
    }
  };

  const addToCart = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    try {
      await axios.post('/api/users/cart', { bookId: book._id, quantity: 1 });
      alert('Added to cart!');
    } catch (err) {
      console.error('Error adding to cart', err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        {book.imageUrl ? (
          <img 
            src={book.imageUrl} 
            alt={book.title} 
            className="max-h-full max-w-full object-cover"
          />
        ) : (
          <div className="text-gray-400 dark:text-gray-500 text-4xl">Book</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
          <Link to={`/books/${book._id}`}>{book.title}</Link>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">by {book.author}</p>
        <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-3">${book.price.toFixed(2)}</p>
        <div className="flex space-x-2">
          <button
            onClick={addToCart}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-md text-sm"
          >
            Add to Cart
          </button>
          <button
            onClick={addToWishlist}
            disabled={isWishlisted}
            className={`p-1 rounded-md ${
              isWishlisted 
                ? 'text-red-500 bg-gray-100 dark:bg-gray-700' 
                : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
