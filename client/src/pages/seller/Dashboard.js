import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const SellerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalSales: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get inventory stats
        const inventoryRes = await axios.get('/api/books/seller/inventory');
        
        // Get orders
        const ordersRes = await axios.get('/api/orders/seller');
        
        // Calculate statistics
        const totalBooks = inventoryRes.data.length;
        const totalOrders = ordersRes.data.length;
        const totalSales = ordersRes.data.reduce((total, order) => {
          const sellerItems = order.items.filter(item => 
            inventoryRes.data.some(book => book._id === item.book._id)
          );
          return total + sellerItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }, 0);
        
        setStats({
          totalBooks,
          totalOrders,
          totalSales
        });
        
        // Get recent orders (last 5)
        setRecentOrders(ordersRes.data.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Seller Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Wallet Balance</h3>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ${user?.wallet?.toFixed(2) || '0.00'}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Books in Inventory</h3>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {stats.totalBooks}
          </p>
          <Link to="/seller/inventory" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            View Inventory
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Total Sales</h3>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ${stats.totalSales.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            From {stats.totalOrders} orders
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Orders</h3>
        </div>
        
        {recentOrders.length === 0 ? (
          <div className="p-6 text-center text-gray-600 dark:text-gray-400">
            No orders yet
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Order