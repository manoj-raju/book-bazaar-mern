import { useState } from 'react';
import BookList from '../components/books/BookList';
import SearchFilters from '../components/search/SearchFilters';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: '', priceRange: { min: '', max: '' } });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (filterData) => {
    setFilters(filterData);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Welcome to BookBazaar
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Find your next favorite book from our vast collection
        </p>
      </div>

      <SearchFilters onSearch={handleSearch} onFilter={handleFilter} />

      <BookList searchTerm={searchTerm} category={filters.category} />
    </div>
  );
};

export default Home;
