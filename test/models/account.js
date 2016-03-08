import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
const expect = chai.expect;

import Account from '../../models/account';

describe('User model', function() {

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
