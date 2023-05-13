import PropTypes from 'prop-types';
import Book from './Book';

const SearchResults = ({ searchedBooks, onMoveBook }) => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {searchedBooks.map((book) => (
          <li key={book.id}>
            <Book bookdetails={book} onMoveBook={onMoveBook} />
          </li>
        ))}
      </ol>
    </div>
  );
};

SearchResults.propTypes = {
  searchedBooks: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default SearchResults;
