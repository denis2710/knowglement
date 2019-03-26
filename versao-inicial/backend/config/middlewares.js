const bodyParser  = require('body-parser')
const cors  = require('cors')
const morgan = require('morgan')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(cors())
  app.use(morgan('tiny'))
}