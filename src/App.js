import React, { useState, useEffect } from 'react';
import { getAll, update } from './BooksAPI';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import ShelvesList from './components/ShelvesList';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [showSearchPage, setShowSearchPage] = useState(false);

  useEffect(() => {
    // Fetch books data from the API when the component mounts
    const fetchBooks = async () => {
      const booksData = await getAll();
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  const onMoveBook = async (book, shelf) => {
    try {
      // Update the book's shelf on the server
      await update(book, shelf);
      // Update the state of the books in the app
      const updatedBooks = books.map((b) => {
        if (b.id === book.id) {
          return { ...b, shelf };
        }
        return b;
      });
      setBooks(updatedBooks);
    } catch (error) {
      console.log(error);
      alert('An error occurred while updating the bookshelf.');
    }
  };

  const handleNavigateToSearch = () => {
    // Set the state to show the search page
    setShowSearchPage(true);
  };

  const handleNavigateBack = () => {
    // Set the state to hide the search page and go back to the main page
    setShowSearchPage(false);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            exact
            path="/"
            element={
              // Render the main page component
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <ShelvesList bookslist={books} onMoveBook={onMoveBook} />
                <div className="open-search">
                  <Link to="/search" onClick={handleNavigateToSearch}>
                    Add a book
                  </Link>
                </div>
              </div>
            }
          />
          <Route
            path="/search"
            element={
              // Render the search page component
              <Search
                bookslist={books}
                onMoveBook={onMoveBook}
                navigateBack={handleNavigateBack}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
