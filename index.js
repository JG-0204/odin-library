// Storage
const library = [];

// Book object constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead == 'true' ? true : false;
}

function inputBook() {
  let title = prompt('book title', 'atomic');
  let author = prompt('book author', 'john doe');
  let pages = prompt('book pages', 0);
  let isRead = prompt('isRead', false);

  let book = new Book(title, author, pages, isRead);

  library.push(book);

  displayBook();
}

const addButton = document
  .querySelector('.add-book')
  .addEventListener('click', inputBook);

function displayBook() {
  const container = document.querySelector('.cards-container');
  library.forEach((book) => {
    if (!book.isDisplayed) {
      book.isDisplayed = true;
      console.log(book);
      createCard(book.title, book.author, book.pages, book.isRead, container);
    }
  });
}

function createCard(title, author, pages, status, container) {
  const card = document.createElement('div');
  card.classList.add('card');

  const bookTitle = document.createElement('p');
  bookTitle.classList.add('title');
  const bookAuthor = document.createElement('p');
  bookAuthor.classList.add('author');
  const bookPages = document.createElement('p');
  bookPages.classList.add('pages');
  const bookStatus = document.createElement('p');
  bookStatus.classList.add('status');

  bookTitle.textContent = title;
  bookAuthor.textContent = author;
  bookPages.textContent = pages;
  bookStatus.textContent = status ? 'Read' : 'Unread';

  card.append(bookTitle, bookAuthor, bookPages, bookStatus);
  container.appendChild(card);
}
