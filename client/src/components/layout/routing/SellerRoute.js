import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const SellerRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);
  
  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
  
  return isAuthenticated && user?.role === 'seller' ? children : <Navigate to="/login" />;
};

export default SellerRoute;
