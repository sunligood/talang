var mysql = require('mysql')

var pool = mysql.createPool({
  host: '47.94.221.185',
  user: 'root',
  password: '123456',
  database: 'talang'
})

var connection = {
  query: function (sql, callback) {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log('连接失败')
      } else {
        console.log('连接成功')
        connection.query(sql, function (err, result) {
          callback(err, result)
          connection.release()
        })
      }
    })
  }
}

module.exports = connection