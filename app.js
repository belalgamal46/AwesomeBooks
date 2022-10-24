let data = [
  {
    id: 1,
    name: 'First Book',
    author: 'First Author Name',
  },
  {
    id: 2,
    name: 'Second Book',
    author: 'Second Author Name',
  },
  {
    id: 3,
    name: 'Third Book',
    author: 'Third Author Name',
  },
  {
    id: 4,
    name: 'Fourth Book',
    author: 'Fourth Author Name',
  },
];

let localStorageData = JSON.parse(localStorage.getItem('data'));

const booksContainer = document.querySelector('.books-container');
const bookForm = document.getElementById('bookForm');

window.addEventListener(
  'load',
  (e) => {
    displayBooks(localStorageData);
  },
  false
);

const displayBooks = (data) => {
  booksContainer.innerHTML = '';
  localStorage.setItem('data', JSON.stringify(data));
  for (let i = 0; i < data.length; i++) {
    let content = `
    <div class="book-card" id=${data[i].id}>
      <div class="book-details">
        <h2>${data[i].name}</h2>
        <h2>${data[i].author}</h2>
        <hr />
      </div>
    <button type="button" id="remove-book">Remove</button>
  </div>
    `;
    booksContainer.innerHTML += content;
  }
};

const addBook = (name, author) => {
  localStorageData.push({
    id: localStorageData.length
      ? localStorageData[localStorageData.length - 1].id + 1
      : 1,
    name: name.value,
    author: author.value,
  });
  localStorage.setItem('data', JSON.stringify(localStorageData));
  displayBooks(localStorageData);
};

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookTitle = document.getElementById('book-title');
  const author = document.getElementById('author');
  if (bookTitle.value.length || author.value.length) {
    addBook(bookTitle, author);
    bookTitle.value = '';
    author.value = '';
  } else {
    console.log('book is empty');
  }
});

const removeBooks = (e) => {
  if (e.target.id === 'remove-book') {
    const newData = localStorageData.filter((item) => {
      return item.id != e.target.parentElement.id;
    });
    localStorageData = [...newData];
    localStorage.setItem('data', JSON.stringify(localStorageData));
    displayBooks(localStorageData);
  }
};

booksContainer.addEventListener('click', removeBooks);
