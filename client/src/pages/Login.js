import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const { login, isAuthenticated, error, clearErrors } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        Login to Your Account
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={onSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div className="flex flex-col space-y-4">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            Login
          </button>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
