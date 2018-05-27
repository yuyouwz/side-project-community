var Freemarker = require('../index.js');
var path = require('path');
var fs = require('fs');

var fm = new Freemarker({
  viewRoot: path.join(__dirname, './template/'),

  options: {
    sourceEncoding: 'utf-8'
  }
});

var data = fm.renderSync('test.ftl', {word : {user : {sb: "坏人"}}});
console.log(data)