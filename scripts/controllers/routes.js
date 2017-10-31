'use strict'

page('/home', app.bookController.index, app.adminController.verify);
page('/books/new', app.bookController.add);
page('/books/search', app.bookController.search);
page('/books/:book_id/update', app.bookController.fetch, app.bookController.update);
page('/books/:book_id', app.bookController.detail, app.adminController.verify);
page('/admin', app.adminController.sign);
page('/*', function(ctx) {
  let baseRoutes = ['home', 'books', 'admin'];
  if(baseRoutes.includes(ctx.params[0])) {
    console.log('wat',ctx);
    return
  } else {
    page.redirect('/home')
    console.log('why', ctx);
  }
});
page({hashbang: true});
// page();
