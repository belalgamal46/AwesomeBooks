const data = [
  {
    name: "First Book",
    author: "First Author Name",
  },
  {
    name: "Second Book",
    author: "Second Author Name",
  },
  {
    name: "Third Book",
    author: "Third Author Name",
  },
  {
    name: "Fourth Book",
    author: "Fourth Author Name",
  },
];
const booksContainer = document.querySelector(".books-container");
const bookForm = document.getElementById("bookForm");
const displayBooks = () => {
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
    booksContainer.innerHTML += content;
  }
};

const addBook = (name, author) => {
  data.push({ name: name.value, author: author.value });
  booksContainer.innerHTML = "";
  displayBooks();
};

displayBooks();

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookTitle = document.getElementById("book-title");
  const author = document.getElementById("author");
  if (bookTitle.value.length || author.value.length) {
    addBook(bookTitle, author);
    bookTitle.value = "";
    author.value = "";
  } else {
    console.log("book is empty");
  }
});
