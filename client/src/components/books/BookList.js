import { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from './BookItem';

const BookList = ({ category, searchTerm }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/books');
        let filteredBooks = res.data;
        
        if (category) {
          filteredBooks = filteredBooks.filter(book => book.category === category);
        }
        
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filteredBooks = filteredBooks.filter(
            book => 
              book.title.toLowerCase().includes(term) || 
              book.author.toLowerCase().includes(term) ||
              book.description.toLowerCase().includes(term)
          );
        }
        
        setBooks(filteredBooks);
      } catch (err) {
        console.error('Error fetching books', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category, searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg text-gray-600 dark:text-gray-300">No books found</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map(book => (
        <BookItem key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
