/* eslint-disable max-classes-per-file */

const booksContainer = document.querySelector('.books-container');
// Book class: Represent a book
class Book {
  constructor(bookTitle, authorName, bookId) {
    this.bookTitle = bookTitle;
    this.authorName = authorName;
    this.bookId = bookId;
  }
}

// locatStorage class
class Store {
  static getBooks() {
    let books = null;
    if (localStorage.getItem('books') === null) {
      books = [];
      return books;
    }
    books = JSON.parse(localStorage.getItem('books'));

    return books;
  }

  static addBooks(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(book) {
    const books = Store.getBooks();

    if (book.id !== 'remove-book') {
      return;
    }

    books.forEach((bookItem, index) => {
      if (bookItem.bookId === parseInt(book.parentElement.id, 10)) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// interface class
class Interface {
  static displayBooks() {
    const books = Store.getBooks();

    booksContainer.innerHTML = '';

    books.forEach((book) => Interface.addBookToInterface(book));
  }

  static addBookToInterface(book) {
    booksContainer.innerHTML += `
    <div class="book-card" id=${book.bookId}>
      <div class="book-details">
        <h2>${book.bookTitle}</h2>
        <h2>${book.authorName}</h2>
        <hr />
      </div>
      <button type="button" id="remove-book">Remove</button>
    </div>
    `;
  }

  static removeBookFromInterface(book) {
    if (book.id === 'remove-book') {
      book.parentElement.remove();
    }
  }

  static clearInputs() {
    document.getElementById('book-title').value = '';
    document.getElementById('author').value = '';
  }
}

// Event: Display books
document.addEventListener('DOMContentLoaded', Interface.displayBooks);

// Event: add a book
const bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const bookTitle = document.getElementById('book-title').value;
  const authorName = document.getElementById('author').value;

  const bookData = Store.getBooks();
  const id = bookData.length ? bookData[bookData.length - 1].bookId + 1 : 1;

  if (bookTitle === '' || authorName === '') {
    alert('Please fill in all fields');
    return;
  }
  const book = new Book(bookTitle, authorName, id);

  Interface.addBookToInterface(book);
  Store.addBooks(book);
  Interface.clearInputs();
});

// Event: remove a book
booksContainer.addEventListener('click', (event) => {
  Interface.removeBookFromInterface(event.target);
  Store.removeBook(event.target);
});
