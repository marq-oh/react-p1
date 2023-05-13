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
    const fetchBooks = async () => {
      const booksData = await getAll();
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  const onMoveBook = async (book, shelf) => {
    try {
      await update(book, shelf);
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
    setShowSearchPage(true);
  };

  const handleNavigateBack = () => {
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
