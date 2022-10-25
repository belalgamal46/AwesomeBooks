/* eslint-disable max-classes-per-file */

const booksContainer = document.querySelector('.books-container');
// Book class: Represent a book
class Books {
  constructor(bookTitle, authorName, bookId) {
    this.bookTitle = bookTitle;
    this.authorName = authorName;
    this.bookId = bookId;
  }

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
    const books = Books.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(book) {
    const books = Books.getBooks();

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
    const books = Books.getBooks();

    booksContainer.innerHTML = '';

    books.forEach((book) => Interface.addBookToInterface(book));
  }

  static addBookToInterface(book) {
    booksContainer.innerHTML += `
    <div class="book-card" id=${book.bookId}>
      <div class="book-details">
        <p>"${book.bookTitle}"</p>
        <p> by </p>
        <p>${book.authorName}</p>
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

  const bookData = Books.getBooks();
  const id = bookData.length ? bookData[bookData.length - 1].bookId + 1 : 1;

  if (bookTitle === '' || authorName === '') {
    // eslint-disable-next-line no-alert
    alert('Please fill in all fields');
    return;
  }
  const book = new Books(bookTitle, authorName, id);

  Interface.addBookToInterface(book);
  Books.addBooks(book);
  Interface.clearInputs();
});

// Event: remove a book
booksContainer.addEventListener('click', (event) => {
  Interface.removeBookFromInterface(event.target);
  Books.removeBook(event.target);
});
