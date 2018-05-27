var glob = require('glob');
var extraPath = [];
var aa=  ['./source/entries/**/*.js'].reduce(function (entries, config) {
      const files = glob.sync(config); // 注意：glob读出来的都是斜杠路径：/
      return files.reduce(function(memo, file) {
        // const name = path.basename(file, '.js');
        const name = file.replace(/^.*entries\/|\.js$/g, '');
        const pathArr = extraPath.slice();
        pathArr.push(file);
        memo[name] = pathArr;
        return memo;
      }, entries);
    }, {});
    console.log(aa)