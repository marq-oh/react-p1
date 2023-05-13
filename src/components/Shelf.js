import PropTypes from 'prop-types';
import Book from './Book';

const Shelf = ({ title, shelfbooks, onMoveBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfbooks.map((book) => (
            <li key={book.id}>
              <Book bookdetails={book} onMoveBook={onMoveBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  shelfbooks: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default Shelf;
