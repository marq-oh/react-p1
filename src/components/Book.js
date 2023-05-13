import PropTypes from 'prop-types';

const Book = ({ bookdetails, onMoveBook }) => {
  const handleShelfChange = (e) => {
    const shelf = e.target.value;
    onMoveBook(bookdetails, shelf);
  };

  const thumbnail = bookdetails.imageLinks ? bookdetails.imageLinks.thumbnail : '';

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${thumbnail}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={bookdetails.shelf} onChange={handleShelfChange}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{bookdetails.title}</div>
      <div className="book-authors">{bookdetails.authors ? bookdetails.authors.join(', ') : 'No authors available'}</div>
    </div>
  );
};

Book.propTypes = {
  bookdetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
    shelf: PropTypes.oneOf(['currentlyReading', 'wantToRead', 'read', 'none']),
  }).isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default Book;
