var express = require('express');
var router = express.Router();
var mysql = require('../mysql/index')

/* GET users listing. */
router.post('/add', function (req, res, next) {
  let body = req.body
  let sql = `INSERT INTO order_list (name, done, work, detail, price) VALUES (?,?,?,?,?)`
  let sqlVal = [body.name, body.done, body.work, body.detail, body.price]
  mysql.query(sql, sqlVal, (err, result) => {
    if (err) {
      res.send({
        code: 0,
        msg: err.message
      })
      return
    }
    res.send({
      code: 1,
      msg: '添加成功'
    });
  })
});
router.post('/query', function (req, res, next) {
  let body = req.body
  let sql = `SELECT * FROM order_list`
  let unit = ''
  try {
    if (body.name || body.deon || body.work) {
      for (let key in body) {
        if (body[key]) {
          unit += `${key} = '${body[key]}'&and&`
        }
      }
      unit = unit.replace(/&/g, ' ')
      unit = unit.substring(0, unit.length - 5)
      sql = `SELECT * FROM order_list where ${unit}`
    }
  } catch (error) {
    console.log(error, 1)
  }
  mysql.query(sql, (err, result) => {
    if (err) {
      res.send({
        code: 0,
        msg: err.message
      })
      return
    }
    res.send({
      code: 1,
      data: result,
      msg: '查询成功'
    });
  })
});

router.post('/update', function (req, res, next) {
  let body = req.body
  let sql = ''
  let unit = ''
  if (body) {
    for (let key in body) {
      if (body[key] && key !== 'orderID') {
        unit += `${key}='${body[key]}',`
      }
    }
    // unit = unit.replace(/&/g, ',')
    unit = unit.substring(0, unit.length - 1)
    sql = `update order_list set ${unit} where orderID=${body.orderID}`
    console.log(sql, 1)
  }
  mysql.query(sql, (err, result) => {
    if (err) {
      res.send({
        code: 0,
        msg: err.message
      })
      return
    }
    res.send({
      code: 1,
      msg: '更新成功'
    });
  })
});
router.post('/dalete', function (req, res, next) {
  let body = req.body
  let sql = ''
  if (body) {
    sql = `DELETE FROM order_list where orderID=${body.orderID}`
  }
  mysql.query(sql, (err, result) => {
    if (err) {
      res.send({
        code: 0,
        msg: err.message
      })
      return
    }
    res.send({
      code: 1,
      msg: '删除成功'
    });
  })
});

module.exports = router;
