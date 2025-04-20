import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const userLinks = (
    <>
      <li>
        <Link to="/cart" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          Cart
        </Link>
      </li>
      <li>
        <Link to="/wishlist" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          Wishlist
        </Link>
      </li>
      <li>
        <Link to="/orders" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          Orders
        </Link>
      </li>
    </>
  );

  const sellerLinks = (
    <>
      <li>
        <Link to="/seller/dashboard" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/seller/inventory" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          Inventory
        </Link>
      </li>
      <li>
        <Link to="/seller/add-book" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          Add Book
        </Link>
      </li>
      <li>
        <Link to="/seller/orders" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          Orders
        </Link>
      </li>
    </>
  );

  const authLinks = (
    <>
      {user && user.role === 'seller' ? sellerLinks : userLinks}
      <li>
        <button 
          onClick={logout} 
          className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Logout
        </button>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/login" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          Login
        </Link>
      </li>
      <li>
        <Link to="/register" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          Register
        </Link>
      </li>
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              BookBazaar
            </Link>
          </div>
          <div className="flex items-center">
            <ul className="flex space-x-2">
              <li>
                <Link to="/" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                  Home
                </Link>
              </li>
              {isAuthenticated ? authLinks : guestLinks}
              <li>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {darkMode ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
