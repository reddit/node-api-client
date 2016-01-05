require('babel/register')({
  extensions: ['.js', '.es6.js'],
  stage: 0,
});

require('./endpoints/v1');
require('./models/account');
require('./models/base');
require('./models/comment');
require('./models/link');
