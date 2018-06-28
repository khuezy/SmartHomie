const tesla = require('tesla-api')


class Tesla {
  constructor() {
    for (const f of Object.getOwnPropertyNames(this.__proto__)) {
      this[f] = this[f].bind(this)
    }
  }

  async getVehicle() {
    const vehicles = await tesla.login({
      email: process.env.TESLA_EMAIL,
      password: process.env.TESLA_PASSWORD
    })

    const vehicle = vehicles[0]
    await vehicle.wakeUp()
    return vehicle
  }

}

module.exports = new Tesla()