import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Wallet = () => {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  
  const addFunds = async (e) => {
    e.preventDefault();
    
    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    setLoading(true);
    try {
      await axios.post('/api/users/wallet/add', { amount: Number(amount) });
      alert('Funds added successfully!');
      window.location.reload();
    } catch (err) {
      console.error('Error adding funds', err);
      alert(err.response?.data?.message || 'Error adding funds');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Wallet</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 dark:text-gray-300">Current Balance</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            ${user?.wallet?.toFixed(2) || '0.00'}
          </span>
        </div>
        
        <form onSubmit={addFunds}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="amount">
              Add Funds
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
                $
              </span>
              <input
                type="number"
                id="amount"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Add Funds'}
          </button>
        </form>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          <strong>Note:</strong> This is a demo application. No real payment processing is implemented.
          Funds added here are virtual and for demonstration purposes only.
        </p>
      </div>
    </div>
  );
};

export default Wallet;