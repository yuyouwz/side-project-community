var path = require('path');
var fs = require('fs');


describe('Test', function() {

  var fm = require('../index.js');
  it('get right version data', function(done) {
    expect(fm.version).toBeDefined();
    // fm.version.should.be.ok;

    fm.getFMPPVersion(function(err, data) {
      expect(!!!err).toBeTruthy();
      expect(data).toBeDefined();
      expect(data).toMatch(/FMPP version/);
      done();
    });
  });

  it('run fmpp command', function(done) {
    // run `fmpp --version` and get result
    fm.exec(['--version'], function(err, result) {
      expect(!!!err).toBeTruthy();
      expect(result).toMatch(/FMPP|FreeMarker version/);
      done();
    });
  });

});

describe('Test freemarker.js', function() {

  var Freemarker = require('../index.js');

  it('Create new Freemarker.js instance', function(done) {
    var fm = new Freemarker({
      viewRoot: path.join(__dirname, './template'),

      options: {
      }
    });

    fm.render('test.ftl', {
      word: 'Jack Jone'
    }, function(err, data, out) {
      expect(!!!err).toBeTruthy();
      expect(data).toMatch(/Jack Jone/);
      expect(data).toMatch(/中文/);
      expect(data).toMatch(/¥/);
      expect(data).toMatch(/child partial/);
      done();
    });
  });

  it('Param viewRoot must be set', function() {
    expect(function() {
      var fm = new Freemarker({});
    }).toThrow('Freemarker: Need viewRoot param.');
  });

  it('Could include another template with relative path', function(done) {
    var fm = new Freemarker({
      viewRoot: path.join(__dirname, '/template/')
    });

    fm.render('/subfolder/index.ftl', {}, function(err, data, out) {
      expect(data).toMatch(/child partial/);
      done(err);
    });
  });

  it('sync render', function() {
    var fm = new Freemarker({
      viewRoot: path.join(__dirname, './template/'),

      options: {
        sourceEncoding: 'utf-8'
      }
    });

    var data = fm.renderSync('test.ftl', {word : {user : {sb: "坏人"}}});
    expect(data).toMatch(/坏人/);
    expect(data).toMatch(/中文/);
    expect(data).toMatch(/¥/);
    expect(data).toMatch(/child partial/);
  });

});
