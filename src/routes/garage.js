const routes = require('express').Router()
const myq = require('../lib/myq')

const garage = require('../handlers/garage')

routes.put('/door', async (req, res) => {

  const {state} = req.body

  let response = {}
  switch (state) {
    case 'open':
      response = await garage.open()
      break
    case 'close':
      response = await garage.close()
      break
    default:
      respones = {success: false, message: 'Bad request'}
  }
  res.send(response)

})


module.exports = routes
