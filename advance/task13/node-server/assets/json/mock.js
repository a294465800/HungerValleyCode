const Mock = require('mockjs')
var data = Mock.mock({
  'list|1-10': [{
    'id|+1': 1,
    'name|1-3': '@FIRST'
  }]
});
console.log(JSON.stringify(data, null, 4))