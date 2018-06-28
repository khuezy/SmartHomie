require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const garageRoutes = require('./src/routes/garage')
const teslaRoutes = require('./src/routes/tesla')


// create application/json parser
var jsonParser = bodyParser.json()

app.use('/api/garage', jsonParser, garageRoutes)
app.use('/api/tesla', jsonParser, teslaRoutes)

app.listen(9009, () => {
	console.log('Listening Garage on 9009')
})
