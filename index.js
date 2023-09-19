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
