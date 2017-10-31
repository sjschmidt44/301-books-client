'use strict';

var app = app || {};
var __API_URL__ = 'https://books-server-301.herokuapp.com'; // TODO: Define the URL to your deployed API on Heroku

(function(module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }
  
  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }
  
  Book.all = [] ;
  Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));
  Book.fetchAll = callback => 
    $.get(`${__API_URL__}/api/v1/books`)
      .then(results => Book.loadAll(results))
      .then(callback)
      .catch(errorCallback);

  Book.fetchOne = (ctx, callback) => 
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.book_id}`)
      .then(results => {
        ctx.book = results[0];
        callback();
      })
      .catch(errorCallback);

  Book.create = book => 
    $.post(`${__API_URL__}/api/v1/books`, book)
      .then(() => page('/'))
      .catch(errorCallback);

  Book.update = (book, bookId) =>
      $.ajax({
        url: `${__API_URL__}/api/v1/books/${bookId}`,
        method: 'PUT',
        data: book,
      })
      .then(() => page(`/books/${bookId}`))
      .catch(errorCallback)

  Book.destroy = id => 
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${id}`,
      method: 'DELETE',
    })
    .then(() => page('/'))
    .catch(errorCallback)

  Book.find = (book, callback) => {
    let url = 'https://www.googleapis.com/books/v1/volumes?q='
    if(book.title) url += `+intitle:${book.title}`;
    if(book.author) url += `+inauthor:${book.author}`;
    if(book.isbn) url += `+isbn:${book.isbn}`;
   
    $.get(url)
      .then(results => results.items.map((book, idx) => {
        let {title, authors, industryIdentifiers, imageLinks, description} = book.volumeInfo;
        let placeholderImage = 'http://www.newyorkpaddy.com/images/covers/NoCoverAvailable.jpg';

        return {
          title: title ? title : 'No title available',
          author: authors.length ? authors.join(', ') : authors[0],
          isbn: industryIdentifiers ? `ISBN_13 ${industryIdentifiers[0].identifier}` : idx,
          image_url: imageLinks ? imageLinks.smallThumbnail : placeholderImage,
          description: description ? description : 'No description available',
          book_id: null,
        }
      }))
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback)
  }

  module.Book = Book;
})(app)
