const myq = require('../lib/myq')

const OPEN = 1
const CLOSE = 0

class Garage {
  constructor(props) {
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
  }

  async close() {
    const result = await myq.login()
    const devices = await myq.getDevices([17])
    const door = devices.devices[0]
    console.log('door: ', door)

    if (!door) {
      return {success: false, message: 'Garage not found'}
    }
    if (door.online) {
      if (door.doorState !== 2) {
        const response = await myq.setDoorState(door.id, CLOSE)
        console.log(response)
        return {success: true, message: response}
      } else {
        return {success: true, message: 'Already closed.'}
      }
    } else {
      console.log('Garage offline... waiting...')
      setTimeout(() => {
        this.close()
      }, 5000)
    }
  }

  async open() {
    const result = await myq.login()
    const devices = await myq.getDevices([17])
    const door = devices.devices[0]
    console.log('door: ', door)

    if (!door) {
      return {success: false, message: 'Garage not found'}
    }
    if (door.online) {
      if (door.doorState !== 1) {
        const response = await myq.setDoorState(door.id, OPEN)
        console.log(response)
        return {success: true, message: response}
      } else {
        return {success: true, message: 'Already opened.'}
      }
    } else {
      console.log('Garage offline... waiting...')
      setTimeout(() => {
        this.open()
      }, 5000)
    }
  }
  
}

module.exports = new Garage()