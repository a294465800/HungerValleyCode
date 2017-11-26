/* eslint-disable */
const express = require('express')
const Mock = require('mockjs')
const router = express.Router()

router.use('/', (req, res, next) => {
  console.log('jsonp', 2)
  next()
})

router.get('/', (req, res, next) => {
  const data = Mock.mock({
    'list|1-10': [{
      'id|+1': 1,
      'name|1-3': '@FIRST'
    }]
  })
  const callback = req.query.callback
  const resData = `${callback}(${JSON.stringify(data)})`
  res.end(resData)
})

module.exports = router