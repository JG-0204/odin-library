// global variables
const bookContainer = document.querySelector('.cards-container');

const addBookModal = document.querySelector('dialog');
const form = document.querySelector('form');

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(book) {
    const bookIndex = this.books.indexOf(book);
    this.books.splice(bookIndex, 1);
  }

  displayBook(book) {
    createCard(book);
  }

  changeBookStatus(book) {
    book.status = book.status ? false : true;
  }
}

const library = new Library();

const showModalButton = document.querySelector('.input-book');
showModalButton.addEventListener('click', () => {
  addBookModal.showModal();
});

const addBookButton = document.querySelector('.add-book');
addBookButton.addEventListener('click', (e) => {
  const title = document.querySelector('#book-title').value;
  const author = document.querySelector('#book-author').value;
  const pages = document.querySelector('#book-pages').value;
  const status = document.querySelector('#book-status').checked;

  // check if form is valid
  if (form.checkValidity()) {
    e.preventDefault();

    const book = new Book(title, author, pages, status);
    library.addBook(book);
    addBookModal.close();

    library.displayBook(book);

    // reset form values
    form.reset();
  }
});

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
  removeButton.addEventListener('click', () => {
    library.removeBook(book);
    bookContainer.removeChild(card);
  });
  return removeButton;
}

function createStatusButton(book, className) {
  const statusButton = document.createElement('button');
  statusButton.classList.add(className);
  statusButton.textContent = book.status ? 'Read' : 'Unread';
  setButtonBackgroundColor(book, statusButton);
  statusButton.addEventListener('click', () => {
    library.changeBookStatus(book);
    statusButton.textContent = book.status ? 'Read' : 'Unread';
    setButtonBackgroundColor(book, statusButton);
  });
  return statusButton;
}

function setButtonBackgroundColor(book, btn) {
  btn.style.backgroundColor = book.status ? '#7fd1ae' : '#f48966';
}

// modal quit button
const exitModalButton = document.querySelector('.exit-modal');
exitModalButton.addEventListener('click', () => {
  addBookModal.close();
  form.reset();
});
