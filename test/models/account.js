require('babel/register')({
  extensions: ['.js', '.es6.js']
});

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai)

var Account = require('../../src/api').models.Account;

describe('Account model', function() {

  describe('validation', function() {
    var validAttrs = {
      thingId: 't2_valid',
    };

    it('expects `thingId` to be a valid id', function() {
      var account = new Account(validAttrs);

      expect(account.validate()).to.equal(true);

      account.set('thingId', 'invalid');

      var errors = account.validate();

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal('thingId');
    });
  });
});