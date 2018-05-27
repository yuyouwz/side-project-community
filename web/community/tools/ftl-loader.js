/* eslint-disable import/default */

import loaderUtils from 'loader-utils';
// 使用本地freemarker.js package以解决mock中文数据乱码的问题，见https://github.com/ijse/freemarker.js/issues/27
import Freemarker from './freemarker/index';
import fs from 'fs';
import path from 'path';
const viewPath = '../views/';

function getMockData (mockFilePath) {
  let returnedData = {};
  try {
    let buff = fs.readFileSync(mockFilePath);
    returnedData = JSON.parse(buff.toString('utf8'));
  } catch (e) {
    returnedData = {};
    throw new Error(`ftl mock data parse error: ${mockFilePath}`);
  }
  return returnedData;
}

export default function (source) {
  const options = loaderUtils.getOptions(this);
  if ( !options.dataPath ) {
    throw new Error('ftl-loader require dataPath options.');
  }
  if ( !options.templatePath ) {
    throw new Error('ftl-loader require templatePath options.');
  }
  this.cacheable && this.cacheable();
  const fm = new Freemarker({
    viewRoot: path.join(__dirname, viewPath),
    options: {
      sourceEncoding: 'utf-8'
    }
  });
  options.client = true;

  // Skip compile debug for production when running with
  // webpack --optimize-minimize
  if (this.minimize && options.compileDebug === undefined) {
    options.compileDebug = false;
  }
  const jsonPath = this.resourcePath
    .replace(/\\/g, '/')
    .replace(options.templatePath, options.dataPath)
    .replace(/(\.\w+)?$/, '.json')
    .replace(/\//g, path.sep);
  if ( !fs.existsSync(jsonPath) ) {
    throw new Error(`not find ftl mock data on jsonPath: ${jsonPath}, please run nei update first and check mock data on nei`);
  }
  const template = fm.renderSync(path.relative(path.join(__dirname, viewPath), this.resourcePath), getMockData(jsonPath));
  return template;
}
