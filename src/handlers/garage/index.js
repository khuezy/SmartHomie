const myq = require('../lib/myq')

const OPEN = 1
const CLOSE = 0

class Garage {
  constructor(props) {
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  async close(res) {
    const result = await myq.login()
    const devices = await myq.getDevices([17])
    const door = devices.devices[0]
    console.log('door: ', door)

    if (!door) {
      res.status(500)
      res.send({success: false, message: 'Garage not found'})
      return
    }
    if (door.online) {
      if (door.doorState !== 2) {
        const response = await myq.setDoorState(door.id, CLOSE)
        console.log(response)
        res.send({success: true, message: response})
      } else {
        res.send({success: true, message: 'Already closed.'})
      }
    } else {
      console.log('Garage offline... waiting...')
      setTimeout(() => {
        this.close(res)
      }, 5000)
    }
  }

  async open(res) {
    const result = await myq.login()
    const devices = await myq.getDevices([17])
    const door = devices.devices[0]
    console.log('door: ', door)

    if (!door) {
      res.status(500)
      res.send({success: false, message: 'Garage not found'})
      return
    }
    if (door.online) {
      if (door.doorState !== 1) {
        const response = await myq.setDoorState(door.id, OPEN)
        console.log(response)
        res.send({success: true, message: response})
      } else {
        res.send({success: true, message: 'Already opened.'})
      }
    } else {
      console.log('Garage offline... waiting...')
      setTimeout(() => {
        this.open(res)
      }, 5000)
    }
  }
  
}

module.exports = new Garage()