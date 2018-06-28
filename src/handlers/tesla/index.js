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

    this.vehicle = vehicles[0]
    return this.vehicle
  }

}

module.exports = new Tesla()