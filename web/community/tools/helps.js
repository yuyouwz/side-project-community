import path from 'path';
import fs from 'fs';
import glob from 'glob';

// @return ['views/login/login.ftl']
const travelDir = (dir, collector) => {
  fs.readdirSync(dir).forEach(function (file) {
    const pathname = path.join(dir, file);
    if ( fs.statSync(pathname).isDirectory() ) {
      travelDir(pathname, collector);
    } else {
      collector.push(pathname);
    }
  });
};

// 从ftl文件路径匹配得到webpack entry name
const getEntireName = (pt, prefix, suffix) => {
  prefix = prefix || 'views';
  suffix = suffix || '.ftl';
  // views/login/login.ftl -> login/login
  const reg1 = new RegExp(`^\.*${prefix}\\${path.sep}|\\${suffix}$`, 'g');
  const reg2 = new RegExp(`\\${path.sep}`, 'g');
  const chunkName = pt.replace(reg1, '').replace(reg2, '/');
  return chunkName;
};
// @return {'setting/setting': [ './source/entries/setting/setting.js' ] }
const getEntries = (configs, extraPath) => {
  extraPath = extraPath || [];
  return configs.reduce(function (entries, config) {
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
};
export { travelDir };
export { getEntireName };
export { getEntries };
