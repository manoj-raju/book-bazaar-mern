import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: 'user'
  });
  const { name, email, password, password2, role } = formData;
  const { register, isAuthenticated, error, clearErrors } = useContext(AuthContext);
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
    if (password !== password2) {
      alert('Passwords do not match');
    } else {
      register({ name, email, password, role });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        Create an Account
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={onSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
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
        <div className="mb-4">
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
            minLength="6"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password2">
            Confirm Password
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
            minLength="6"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Account Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === 'user'}
                onChange={onChange}
                className="mr-2"
              />
              User
            </label>
            <label className="flex items-center text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="role"
                value="seller"
                checked={role === 'seller'}
                onChange={onChange}
                className="mr-2"
              />
              Seller
            </label>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            Register
          </button>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;