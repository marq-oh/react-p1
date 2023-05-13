import { useState } from "react";
import Shelf from "./Shelf";

const ShelvesList = ({ bookslist, onMoveBook }) => {
  const currentlyReadingBooks = bookslist.filter(
    (book) => book.shelf === "currentlyReading"
  );
  const wantToReadBooks = bookslist.filter((book) => book.shelf === "wantToRead");
  const readBooks = bookslist.filter((book) => book.shelf === "read");

  return (
    <div className="list-books-content">
      <Shelf title="Currently Reading" shelfbooks={currentlyReadingBooks} onMoveBook={onMoveBook} />
      <Shelf title="Want to Read" shelfbooks={wantToReadBooks} onMoveBook={onMoveBook} />
      <Shelf title="Read" shelfbooks={readBooks} onMoveBook={onMoveBook} />
    </div>
  );
}

export default ShelvesList;
