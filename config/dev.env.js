'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.95.57:8089"',//测试服务器
  // BASE_API: '"http://192.168.16.117:8089"',//田杰
  BASE_API:'"http://192.168.16.84:8089"'//张宇
  // BASE_API: '"http://192.168.16.142:8089"' //谷跃飞

})
