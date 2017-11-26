/* eslint-disable */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const jsonp = require('./assets/router/jsonp')
const cors = require('./assets/router/cors')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
  next()
})

app.use('/jsonp', jsonp)
app.use('/cors', cors)
app.listen(3000, () => {
  console.log('app listening on port 3000!')
})