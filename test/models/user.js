var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai)

var User = require('../../src/api').models.User;

describe('User model', function() {

  describe('validation', function() {
    var validAttrs = {
      thingId: 't2_valid',
    };

    it('expects `thingId` to be a valid id', function() {
      var user = new User(validAttrs);

      expect(user.validate()).to.equal(true);

      user.set('thingId', 'invalid');

      var errors = user.validate();

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal('thingId');
    });
  });
});
