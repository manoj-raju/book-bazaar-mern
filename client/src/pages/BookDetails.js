import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error('Error fetching book details', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const addToCart = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    try {
      await axios.post('/api/users/cart', { bookId: id, quantity });
      alert('Added to cart!');
    } catch (err) {
      console.error('Error adding to cart', err);
      alert(err.response?.data?.message || 'Error adding to cart');
    }
  };

  const addToWishlist = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    try {
      await axios.post('/api/users/wishlist', { bookId: id });
      alert('Added to wishlist!');
    } catch (err) {
      console.error('Error adding to wishlist', err);
      alert(err.response?.data?.message || 'Error adding to wishlist');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg text-gray-600 dark:text-gray-300">Book not found</h3>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline mt-2 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-200 dark:bg-gray-700 p-4 flex items-center justify-center">
            {book.imageUrl ? (
              <img 
                src={book.imageUrl} 
                alt={book.title} 
                className="max-h-80 max-w-full object-cover"
              />
            ) : (
              <div className="text-gray-400 dark:text-gray-500 text-6xl h-80 flex items-center">
                Book
              </div>
            )}
          </div>
          <div className="p-6 md:w-2/3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {book.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2">by {book.author}</p>
            <p className="text-indigo-600 dark:text-indigo-400 text-xl font-bold mb-4">
              ${book.price.toFixed(2)}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {book.description}
            </p>
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Category: {book.category}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                Seller: {book.seller?.name || 'Unknown'}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Available: {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
              </p>
            </div>
            {book.stock > 0 && (
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <label className="mr-2 text-gray-700 dark:text-gray-300">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border p-1 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {[...Array(Math.min(10, book.stock)).keys()].map(i => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div className="flex space-x-4">
              <button
                onClick={addToCart}
                disabled={book.stock === 0}
                className={`px-4 py-2 rounded-md ${
                  book.stock > 0
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {book.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button
                onClick={addToWishlist}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-gray-200"
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;