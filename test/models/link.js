import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
const expect = chai.expect;

import Link from '../../models/link';

describe('Link model', function() {

  describe('validation', function() {
    var validAttrs = {
      thingId: 't3_valid',
    };

    it('expects `thingId` to be a valid id', function() {
      var link = new Link(validAttrs);

      expect(link.validate()).to.equal(true);

      link.set('thingId', 'invalid');

      var errors = link.validate();

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal('thingId');
    });
  });

});
