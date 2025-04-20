import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('/api/users/cart');
        setCartItems(res.data);
        calculateTotal(res.data);
      } catch (err) {
        console.error('Error fetching cart', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      return sum + (item.book.price * item.quantity);
    }, 0);
    setTotalAmount(total);
  };

  const updateQuantity = async (bookId, quantity) => {
    try {
      // Remove item if quantity is 0
      if (quantity === 0) {
        removeItem(bookId);
        return;
      }

      await axios.post('/api/users/cart', { bookId, quantity });
      
      // Update local state
      const updatedCart = cartItems.map(item => {
        if (item.book._id === bookId) {
          return { ...item, quantity };
        }
        return item;
      });
      
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    } catch (err) {
      console.error('Error updating quantity', err);
    }
  };

  const removeItem = async (bookId) => {
    try {
      await axios.delete(`/api/users/cart/${bookId}`);
      
      // Update local state
      const updatedCart = cartItems.filter(item => item.book._id !== bookId);
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    } catch (err) {
      console.error('Error removing item', err);
    }
  };

  const placeOrder = async () => {
    try {
      if (user.wallet < totalAmount) {
        alert('Insufficient funds in wallet. Please add funds.');
        return;
      }
      
      await axios.post('/api/orders');
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      console.error('Error placing order', err);
      alert(err.response?.data?.message || 'Error placing order');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Your Cart</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Your cart is empty</p>
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
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Your Cart</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Book</th>
              <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Price</th>
              <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Quantity</th>
              <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Subtotal</th>
              <th className="py-3 px-4 text-gray-700 dark:text-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.book._id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="h-16 w-12 bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                      {item.book.imageUrl ? (
                        <img 
                          src={item.book.imageUrl} 
                          alt={item.book.title} 
                          className="max-h-full max-w-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 dark:text-gray-500 text-xl">Book</div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        <Link to={`/books/${item.book._id}`}>{item.book.title}</Link>
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">by {item.book.author}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                  ${item.book.price.toFixed(2)}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.book._id, Math.max(0, item.quantity - 1))}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span className="mx-2 text-gray-700 dark:text-gray-300">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.book._id, item.quantity + 1)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                  ${(item.book.price * item.quantity).toFixed(2)}
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => removeItem(item.book._id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Total:</span>
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Your Wallet Balance:</span>
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${user?.wallet?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="flex justify-between">
          <Link to="/" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-gray-200">
            Continue Shopping
          </Link>
          <button
            onClick={placeOrder}
            disabled={user?.wallet < totalAmount}
            className={`px-4 py-2 rounded-md ${
              user?.wallet >= totalAmount
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {user?.wallet >= totalAmount ? 'Place Order' : 'Insufficient Funds'}
          </button>
        </div>
        {user?.wallet < totalAmount && (
          <div className="mt-4 text-center">
            <Link
              to="/wallet"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Add funds to your wallet
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
