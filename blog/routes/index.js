var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var conn = mongoose.connection.openUri('mongodb://127.0.0.1:27017/blog');

var User = new mongoose.Schema({
  name: String,
  email: String,
  age: String
})

var myModel = conn.model('user', User);
router.get('/', function (req, res, next) {
  console.log(res)
  myModel.findOne({ name: "xiaoxue" }, function (err, user) {
    res.json({user:user})
  });
});
module.exports = router;