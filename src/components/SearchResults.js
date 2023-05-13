import PropTypes from 'prop-types';
import Book from './Book';

const SearchResults = ({ searchedBooks, onMoveBook }) => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {/* Render each searched book as a list item */}
        {searchedBooks.map((book) => (
          <li key={book.id}>
            {/* Render the Book component for each searched book */}
            <Book bookdetails={book} onMoveBook={onMoveBook} />
          </li>
        ))}
      </ol>
    </div>
  );
};

// Define the prop types for the SearchResults component
SearchResults.propTypes = {
  searchedBooks: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default SearchResults;
