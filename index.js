// global variables
const bookContainer = document.querySelector('.cards-container');

const addBookModal = document.querySelector('dialog');
const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const pagesInput = document.querySelector('#book-pages');
const statusInput = document.querySelector('#book-status');

// Storage
const library = [];

// Book object constructor
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = status;
}

const showModalButton = document.querySelector('.input-book');
showModalButton.addEventListener('click', () => {
  addBookModal.showModal();
});

const addBookButton = document.querySelector('.add-book');
addBookButton.addEventListener('click', (e) => {
  const form = document.querySelector('form');

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const status = statusInput.checked;

  // check if form is valid
  if (form.checkValidity()) {
    e.preventDefault();

    addBookToLibrary(title, author, pages, status);
    addBookModal.close();
    displayBook();
    // reset form values
    form.reset();
  }
});

function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  library.push(book);
}

function displayBook() {
  library.forEach((book) => {
    if (!book.isDisplayed) {
      createCard(book);

      book.isDisplayed = true;
    }
  });
}

function createCard(book) {
  const card = document.createElement('div');
  card.classList.add('card');

  const bookTitle = createParagraph(book.title, 'title');
  const bookAuthor = createParagraph(book.author, 'author');
  const bookPages = createParagraph(book.pages, 'pages');

  // add status button for each book
  const statusButton = createStatusButton(book, 'status-button');

  // add delete button for each book
  const removeButton = createRemoveButton(book, card, 'remove-button');

  card.append(bookTitle, bookAuthor, bookPages, statusButton, removeButton);
  bookContainer.appendChild(card);
}

// helper functions
function createParagraph(text, className) {
  const paragraph = document.createElement('p');
  paragraph.classList.add(className);
  paragraph.textContent = text;
  return paragraph;
}

function createRemoveButton(book, card, className) {
  const removeButton = document.createElement('button');
  removeButton.classList.add(className);
  removeButton.textContent = 'Remove Book';
  removeButton.addEventListener('click', () =>
    removeBookFromLibrary(card, book),
  );
  return removeButton;
}

function createStatusButton(book, className) {
  const statusButton = document.createElement('button');
  statusButton.classList.add(className);
  statusButton.textContent = book.isRead ? 'Read' : 'Unread';
  setButtonBackgroundColor(book, statusButton);
  statusButton.addEventListener('click', () => {
    changeBookStatus(book, statusButton);
    setButtonBackgroundColor(book, statusButton);
  });
  return statusButton;
}

function removeBookFromLibrary(card, book) {
  const bookIndex = library.indexOf(book);
  library.splice(bookIndex, 1);
  bookContainer.removeChild(card);
}

function changeBookStatus(book, btn) {
  library.forEach((arrBook) => {
    if (arrBook === book) {
      arrBook.isRead ? (arrBook.isRead = false) : (arrBook.isRead = true);
      btn.textContent = arrBook.isRead ? 'Read' : 'Unread';
    }
  });
}

function setButtonBackgroundColor(book, btn) {
  btn.style.backgroundColor = book.isRead ? '#7fd1ae' : '#f48966';
}
