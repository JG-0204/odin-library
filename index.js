// Storage
const library = [
  {
    title: 'Midnight Library',
    author: 'Matt Haig',
    pages: 210,
    isRead: true,
  },
];

// Book object constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead ?? false;
}

let atomic = new Book('Atomic Habits', 'James Clear', 214);

function inputBook() {
  let title = prompt('book title', 'atomic');
  let author = prompt('book author', 'john doe');
  let pages = prompt('book pages', 0);
  let isRead = prompt('isRead', false);

  let book = new Book(title, author, pages, isRead);

  library.push(book);
}

const addButton = document
  .querySelector('.add-book')
  .addEventListener('click', inputBook);
