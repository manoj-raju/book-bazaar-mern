import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import SellerDashboard from './pages/seller/Dashboard';
import AddBook from './pages/seller/AddBook';
import Inventory from './pages/seller/Inventory';
import SellerOrders from './pages/seller/Orders';
import PrivateRoute from './components/routing/PrivateRoute';
import SellerRoute from './components/routing/SellerRoute';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <AuthProvider>
      <Router>
        <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-grow container mx-auto px-4 py-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
              <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
              <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
              <Route path="/seller/dashboard" element={<SellerRoute><SellerDashboard /></SellerRoute>} />
              <Route path="/seller/add-book" element={<SellerRoute><AddBook /></SellerRoute>} />
              <Route path="/seller/inventory" element={<SellerRoute><Inventory /></SellerRoute>} />
              <Route path="/seller/orders" element={<SellerRoute><SellerOrders /></SellerRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
