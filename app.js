let data = [
  {
    id: 1,
    name: "First Book",
    author: "First Author Name",
  },
  {
    id: 2,
    name: "Second Book",
    author: "Second Author Name",
  },
  {
    id: 3,
    name: "Third Book",
    author: "Third Author Name",
  },
  {
    id: 4,
    name: "Fourth Book",
    author: "Fourth Author Name",
  },
];
const booksContainer = document.querySelector(".books-container");
const bookForm = document.getElementById("bookForm");

window.addEventListener(
  "load",
  (e) => {
    displayBooks(data);
  },
  false
);

const displayBooks = (data) => {
  booksContainer.innerHTML = "";
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
  data.push({
    id: data.length ? data[data.length - 1].id + 1 : 1,
    name: name.value,
    author: author.value,
  });
  displayBooks(data);
};

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

booksContainer.addEventListener("click", (e) => {
  if (e.target.id === "remove-book") {
    const newData = data.filter((item) => {
      return item.id != e.target.parentElement.id;
    });
    data = [...newData];
    booksContainer.innerHTML = "";
    displayBooks(newData);
  }
});
