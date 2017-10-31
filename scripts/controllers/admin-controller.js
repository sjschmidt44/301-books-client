'use strict';
var app = app || {};

(function (module) {
  let adminController = {};

  adminController.nav = (ctx, next) => module.adminView.nav(ctx, next);
  adminController.verify = (ctx, next) => module.adminView.verify(ctx, next);
  adminController.sign = () => module.adminView.initAdminPage();

  module.adminController = adminController;
})(app)