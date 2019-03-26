module.exports = app => {
  app.route('/users')
    .post(app.api.user.save)
    .get(app.api.user.get)

  app.route('/users/:id')
    .get(app.api.user.get)
    .put(app.api.user.save)
    .delete(app.api.user.remove)

  app.route('/category')
    .post(app.api.category.save)
    .get(app.api.category.get)


  app.route('/category/tree')
    .get(app.api.category.getTree)

  app.route('/category/:id')
    .get(app.api.category.getById)
    .put(app.api.category.save)
    .delete(app.api.category.remove)

}