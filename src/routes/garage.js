const routes = require('express').Router()
const myq = require('../lib/myq')

const garage = require('../handlers/garage')

routes.put('/garage', (req, res) => {

  const {state} = req.body

  switch (state) {
    case 'open':
      garage.open(res)
      break
    case 'close':
      garage.close(res)
      break
    default:
      res.status(400)
      res.send({success: false, message: 'Bad request'})
  }
  
})


module.exports = routes
