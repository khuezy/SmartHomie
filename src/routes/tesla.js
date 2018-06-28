const routes = require('express').Router()

const Tesla = require('../handlers/tesla')
const garage = require('../handlers/garage')


routes.get('/ride', async (req, res) => {
  try {
    garage.open()

    const car = await Tesla.getVehicle()
    await car.doorUnlock()
    
    res.send({success: true, message: 'ok'})

  } catch(err) {
    console.log(err.status, err.message)
    res.send({success: false, message: err.message})
  }

})

routes.put('/door', async (req, res) => {
  const {state} = req.body
  try {
    const car = await Tesla.getVehicle()
    switch (state) {
      case 'lock':
        await car.doorLock()
        break
      case 'unlock':
        await car.doorUnlock()
        break
      default:
        console.log('Default')
    }
    res.send({success: true, message: 'ok'})

  } catch(err) {
    console.log(err.status, err.message)
    res.send({success: false, message: err.message})
  }


})

routes.put('/port', async (req, res) => {
  const {state} = req.body

  const car = await Tesla.getVehicle()
  switch (state) {
    case 'lock':
      await car.doorLock()
      break
    case 'unlock':
      await car.chargePortDoorOpen()
      break
    default:
      console.log('Default')
  }

  res.send({success: true, message: 'ok'})

})

routes.get('/frunk', async (req, res) => {

  const car = await Tesla.getVehicle()
  await car.trunkOpen({which_trunk: 'front'})
  
  res.send({success: true, message: 'ok'})

})

routes.get('/trunk', async (req, res) => {

  const car = await Tesla.getVehicle()
  await car.trunkOpen({which_trunk: 'rear'})
  
  res.send({success: true, message: 'ok'})

})

routes.put('/charge', async (req, res) => {
  let {percent} = req.body
  console.log(`Setting charger limit to ${percent}`)
  const car = await Tesla.getVehicle()
  await car.setChargeLimit({limit_value: percent})
  
  res.send({success: true, message: 'ok'})

})

module.exports = routes