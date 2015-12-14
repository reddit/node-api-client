require('babel/register')({
  extensions: ['.js', '.es6.js']
});

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai)

var Link = require('../../src/api').models.Link;

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