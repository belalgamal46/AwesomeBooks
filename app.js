const data = [
  {
    name: 'First Book',
    author: 'First Author Name',
  },
  {
    name: 'Second Book',
    author: 'Second Author Name',
  },
  {
    name: 'Third Book',
    author: 'Third Author Name',
  },
  {
    name: 'Fourth Book',
    author: 'Fourth Author Name',
  },
];

const displayBooks = () => {
  const booksContainer = document.querySelector('.books-container');
  for (let i = 0; i < data.length; i++) {
    let content = `
    <div class="book-card">
      <div class="book-details">
        <h2>${data[i].name}</h2>
        <h2>${data[i].author}</h2>
        <hr />
      </div>
    <button type="button">Remove</button>
  </div>
    `;
    booksContainer += content;
  }
};

const addBook = () => {
  const bookTitle = document.getElementById('book-title');
  const author = document.getElementById('author');

  const newBook = null;
};

displayBooks();
addBook();
