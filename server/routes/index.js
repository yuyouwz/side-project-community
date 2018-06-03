var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');
var url = require("url");
mongoose.Promise = global.Promise;

var conn = mongoose.connection.openUri('mongodb://127.0.0.1:27017/yuyou');

var Account = new mongoose.Schema({
  user: String,
  password: String
})
var myModel = conn.model('account', Account);
router.post('/', function (req, res, next) {
  
  myModel.findOne({ user: req.body.user, }, function (err, doc) {
    if (err) {
      return res.json({ ret_code: 2, ret_msg: '登录失败' });
    } else if (!doc) {

      res.json({ ret_code: 3, ret_msg: '无账号' });
    } else {
      req.session.regenerate(
        function (err) {
          if (err) {
            return res.json({ ret_code: 2, ret_msg: '登录失败' });
          }
          if (req.body.password != doc.password) {
            res.json({ ret_code: 1, ret_msg: '密码错误' });
          } else {
            res.json({ ret_code: 0, ret_msg: '登录成功' });
            req.session.loginUser = doc.user;
          }
        }
      )

    }
  });
});
module.exports = router;