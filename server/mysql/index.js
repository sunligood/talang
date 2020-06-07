var mysql = require('mysql')

var connection = mysql.createConnection({
  host: '47.94.221.185',
  user: 'root',
  password: '123456',
  database: 'talang'
})
connection.connect((err) => {
  if (err) {
    console.log('连接失败')
  } else {
    console.log('连接成功')
  }
})

module.exports = connection