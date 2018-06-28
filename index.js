require('dotenv').config()

const app = require('express')()
const bodyParser = require('body-parser')

const garageRoute = require('./src/routes/garage')
const teslaRoute = require('./src/routes/tesla')

var jsonParser = bodyParser.json()

app.use('/api/garage', jsonParser, garageRoute)
app.use('/api/tesla', jsonParser, teslaRoute)

app.listen(9009, () => {
	console.log('Listening Garage on 9009')
})
