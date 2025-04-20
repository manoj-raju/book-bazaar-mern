import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Your Orders</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">You haven't placed any orders yet</p>
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
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Your Orders</h2>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Order placed</span>
                <p className="text-gray-800 dark:text-gray-200">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Total</span>
                <p className="text-gray-800 dark:text-gray-200 font-bold">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                <p className="text-gray-800 dark:text-gray-200 capitalize">
                  {order.status}
                </p>
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  Order #{order._id.substring(order._id.length - 6)}
                </span>
              </div>
            </div>
            <div className="p-4">
              {order.items.map((item) => (
                <div key={item._id} className="flex items-start py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <div className="h-20 w-14 bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4 flex-shrink-0">
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
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      <Link to={`/books/${item.book._id}`}>{item.book.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">by {item.book.author}</p>
                    <div className="flex justify-between">
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                      <p className="text-indigo-600 dark:text-indigo-400 font-bold">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;