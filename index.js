// global variables
const container = document.querySelector('.cards-container');

const modal = document.querySelector('dialog');
const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const pagesInput = document.querySelector('#book-pages');
const statusInput = document.querySelector('#book-status');

// Storage
const library = [];

// Book object constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  let book = new Book(title, author, pages, isRead);
  library.push(book);

  displayBook();
}

const addButton = document
  .querySelector('.add-book')
  .addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      statusInput.checked
    );
    modal.close();
  });

function displayBook() {
  library.forEach((book) => {
    if (!book.isDisplayed) {
      book.isDisplayed = true;
      // console.log(book);
      createCard(book.title, book.author, book.pages, book.isRead);
    }
  });
}

function createCard(title, author, pages, status) {
  const card = document.createElement('div');
  card.classList.add('card');

  const bookTitle = document.createElement('p');
  bookTitle.classList.add('title');
  const bookAuthor = document.createElement('p');
  bookAuthor.classList.add('author');
  const bookPages = document.createElement('p');
  bookPages.classList.add('pages');

  // add status button for each book
  const statusButton = document.createElement('button');
  statusButton.classList.add('status-btn');

  statusButton.addEventListener('click', () => {
    changeBookStatus(title, statusButton);
  });

  // add delete button for each book
  const removeButton = document.createElement('button');
  removeButton.textContent = 'X';
  removeButton.addEventListener('click', () => {
    removeBookFromLibrary(card, title);
  });

  bookTitle.textContent = title;
  bookAuthor.textContent = author;
  bookPages.textContent = pages;

  statusButton.textContent = status ? 'Read' : 'Unread';

  card.append(bookTitle, bookAuthor, bookPages, statusButton, removeButton);
  container.appendChild(card);
}

const showModalButton = document.querySelector('.input-book');

showModalButton.addEventListener('click', () => {
  // reset input values before showing modal
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = 0;
  statusInput.checked = false;

  modal.showModal();
});

displayBook();

function removeBookFromLibrary(card, title) {
  library.forEach((book, index) => {
    if (book.title === title) {
      library.splice(index, 1);
    }
  });
  container.removeChild(card);
}

function changeBookStatus(title, btn) {
  library.forEach((book) => {
    if (book.title === title) {
      book.isRead ? (book.isRead = 'Unread') : (book.isRead = 'Read');
      btn.textContent = book.isRead;
    }
  });
}
