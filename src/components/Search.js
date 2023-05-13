import React, { useState } from 'react';
import { search } from '../BooksAPI';
import { Link } from 'react-router-dom';
import SearchResults from './SearchResults';
import PropTypes from 'prop-types';

const Search = ({ bookslist, onMoveBook, navigateBack }) => {
  // State to hold the search query and searched books
  const [query, setQuery] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);

  // Function to update the search query and fetch matching books
  const updateQuery = async (query) => {
    setQuery(query.trim());
    if (query.trim() === '') {
      setSearchedBooks([]);
    } else {
      try {
        // Search for books based on the query
        const data = await search(query.trim());
        if (Array.isArray(data)) {
          // If search result is an array of books, filter and update the searchedBooks state
          const filteredBooks = data.map((book) => {
            const existingBook = bookslist.find((b) => b.id === book.id);
            return existingBook ? existingBook : book;
          });
          setSearchedBooks(filteredBooks);
        } else {
          // If search result is not an array, set searchedBooks to an empty array
          setSearchedBooks([]);
        }
      } catch (error) {
        console.log(error);
        alert('An error occurred while searching for books.');
      }
    }
  };

  // Handle moving a book to a different shelf
  const handleMoveBook = async (book, shelf) => {
    try {
      // Call the onMoveBook function provided by the parent component
      await onMoveBook(book, shelf);
      // Update the shelf of the moved book in the searchedBooks state
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
        {/* Link to navigate back to the homepage */}
        <Link to="/" className="close-search" onClick={navigateBack}>
          back
        </Link>
        <div className="search-books-input-wrapper">
          {/* Input field to enter the search query */}
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>
      {/* Render the search results */}
      <SearchResults searchedBooks={searchedBooks} onMoveBook={handleMoveBook} />
    </div>
  );
};

// Define the prop types for the Search component
Search.propTypes = {
  bookslist: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired,
  navigateBack: PropTypes.func.isRequired,
};

export default Search;
