"use strict";

/**
 * @param {Egg.Application} app - egg application
 */

/**
 *  router.head - HEAD
    router.options - OPTIONS
    router.get - GET
    router.put - PUT
    router.post - POST
    router.patch - PATCH
    router.delete - DELETE
    router.del - 由于 delete 是一个保留字，所以提供了一个 delete 方法的别名。
    router.redirect
 */

module.exports = app => {
  const { router, controller } = app;
  const { home } = controller;

  // router.get('/home/:id', home.info);
  router.post("/api/home", home.info);
  router.post("/user", controller.user.getUserList);
  router.post("/login", controller.login.login);
  router.post("/register", controller.register.register);
};
