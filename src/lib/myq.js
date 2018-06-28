const MyQ = require('./_myq')
const account = new MyQ(process.env.MYQ_EMAIL, process.env.MYQ_PASSWORD)

module.exports = account
