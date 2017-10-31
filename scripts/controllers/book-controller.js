'use strict';
var app = app || {};

(function(module) {
  let bookController = {};

  bookController.index = (ctx, next) => module.Book.fetchAll(() => module.bookView.initIndexPage(ctx, next));
  bookController.detail = (ctx, next) => module.Book.fetchOne(ctx, () => module.bookView.initDetailPage(ctx, next));
  bookController.fetch = (ctx, next) => module.Book.fetchOne(ctx, next);
  bookController.add = () => module.bookView.initCreateFormPage();
  bookController.update = ctx => module.bookView.initUpdateFormPage(ctx);
  bookController.search = () => module.bookView.initSearchFormPage();

  module.bookController = bookController;
})(app)