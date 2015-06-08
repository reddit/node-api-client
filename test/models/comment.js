require('babel/register')({
  extensions: ['.js', '.es6.js']
});

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai)

var Comment = require('../../src/api').models.Comment;

describe('Comment model', function() {

  describe('validation', function() {
    var validAttrs = {
      body: 'anything',
      thingId: 't1_valid',
    };

    it('expects `thingId` to be a valid id', function() {
      var comment = new Comment(validAttrs);

      expect(comment.validate()).to.equal(true);

      comment.set('thingId', 'invalid');

      var errors = comment.validate();

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal('thingId');
    });

    it('expects `body` to be at least 1 character', function() {
      var comment = new Comment(validAttrs);

      expect(comment.validate()).to.equal(true);

      comment.set('body', '');

      var errors = comment.validate();

      expect(errors.length).to.equal(1);
      expect(errors[0]).to.equal('body');
    });
  });
});