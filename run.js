require('babel/register')({
  ignore: false,
  only: /.+(?:(?:\.es6\.js)|(?:.jsx))$/,
  extensions: ['.js', '.es6.js'],
  sourceMap: true,
  stage: 0,
});

module.exports = require('./index');
