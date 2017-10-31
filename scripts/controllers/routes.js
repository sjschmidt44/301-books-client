'use strict'

page('/', app.bookController.index, app.adminController.verify);
page('/books/new', app.bookController.add);
page('/books/search', app.bookController.search);
page('/books/:book_id/update', app.bookController.fetch, app.bookController.update);
page('/books/:book_id', app.bookController.detail, app.adminController.verify);
page('/admin', app.adminController.sign);
page();
