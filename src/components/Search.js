import React, { useState } from 'react';
import { search } from '../BooksAPI';
import { Link } from 'react-router-dom';
import SearchResults from './SearchResults';
import PropTypes from 'prop-types';

const Search = ({ bookslist, onMoveBook, navigateBack }) => {
  const [query, setQuery] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);

  const updateQuery = async (query) => {
    setQuery(query.trim());
    if (query.trim() === '') {
      setSearchedBooks([]);
    } else {
      try {
        const data = await search(query.trim());
        if (Array.isArray(data)) {
          const filteredBooks = data.map((book) => {
            const existingBook = bookslist.find((b) => b.id === book.id);
            return existingBook ? existingBook : book;
          });
          setSearchedBooks(filteredBooks);
        } else {
          setSearchedBooks([]);
        }
      } catch (error) {
        console.log(error);
        alert('An error occurred while searching for books.');
      }
    }
  };

  const handleMoveBook = async (book, shelf) => {
    try {
      await onMoveBook(book, shelf);
      const updatedBooks = searchedBooks.map((b) => {
        if (b.id === book.id) {
          return { ...b, shelf };
        }
        return b;
      });
      setSearchedBooks(updatedBooks);
    } catch (error) {
      console.log(error);
      alert('An error occurred while updating the bookshelf.');
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search" onClick={navigateBack}>
          back
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>
      <SearchResults searchedBooks={searchedBooks} onMoveBook={handleMoveBook} />
    </div>
  );
};

Search.propTypes = {
  bookslist: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired,
  navigateBack: PropTypes.func.isRequired,
};

export default Search;
