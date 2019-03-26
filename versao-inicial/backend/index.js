const app  = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db;

consign()
  .then('./config/middlewares.js')
  .then('./api/validator.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app)

const listener = app.listen(3000, () => {
  console.log('Backend rodando com sucesso na porta ' + listener.address().port )
})


