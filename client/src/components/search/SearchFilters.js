import { useState } from 'react';

const SearchFilters = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    onFilter({ category, priceRange });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search by title, author, or keyword..."
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-1/4">
            <select
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="educational">Educational</option>
              <option value="children">Children's Books</option>
              <option value="sci-fi">Science Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
            </select>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min $"
              className="w-24 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max $"
              className="w-24 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;