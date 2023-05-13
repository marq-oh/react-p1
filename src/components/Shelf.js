import PropTypes from 'prop-types';
import Book from './Book';

const Shelf = ({ title, shelfbooks, onMoveBook }) => {
  return (
    <div className="bookshelf">
      {/* Render the title of the shelf */}
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {/* Render each book in the shelfbooks array */}
          {shelfbooks.map((book) => (
            <li key={book.id}>
              {/* Render the Book component for each book */}
              <Book bookdetails={book} onMoveBook={onMoveBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

// Define the prop types for the Shelf component
Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  shelfbooks: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default Shelf;
