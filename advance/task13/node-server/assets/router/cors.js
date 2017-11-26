const express = require('express')
const router = express.Router()
const Mock = require('mockjs')

router.use('/', (req, res, next) => {
  console.log('cors')

  res.append('access-control-allow-origin', 'http://127.0.0.1:8090')
  // res.append('withCredentials', true)
  next()
})

router.get('/', (req, res, next) => {
  const data = Mock.mock({
    'list|1-10': [{
      'id|+1': 1,
      'name|1-3': '@FIRST'
    }]
  })
  res.json(data)
})

module.exports = router