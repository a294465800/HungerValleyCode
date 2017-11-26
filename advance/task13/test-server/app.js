const express = require('express')
const app = express()
const path = require('path')

app.get('/jsonp', (req, res, next) => {
  res.sendFile(path.join(__dirname+'/src/jsonp.html'));
})

app.get('/cors', (req, res, next) => {
  res.sendFile(path.join(__dirname+'/src/cors.html'));
})


app.get('/a.html', (req, res, next) => {
  res.sendFile(path.join(__dirname+'/src/a.html'));
})


app.get('/b.html', (req, res, next) => {
  res.sendFile(path.join(__dirname+'/src/b.html'));
})
app.listen(8090, () => {
  console.log('listening the port 8090...')
})