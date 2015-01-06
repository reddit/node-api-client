require('6to5/register')({
  extensions: ['.js', '.es6.js']
});

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai)

var Base = require('../../src/api').models.Base;

describe('Base model', function() {
  describe('constructor', function() {
    it('creates a base properties hash', function() {
      var base = new Base();
      expect(base.props).to.be.a('object');
    });

    it('creates readable/writable properties', function() {
      var base = new Base({
        testA: 'A',
        testB: 'B',
      });

      expect(base.get('testA')).to.equal('A');
      expect(base.get('testB')).to.equal('B');

      base.set('testA', 'AA');
      base.set('testB', 'BB');

      expect(base.get('testA')).to.equal('AA');
      expect(base.get('testB')).to.equal('BB');

    });
  });

  describe('validation', function() {
    it('returns invalid properties', function() {
      var invalid;
      var child = new Base({}, {
        validators: {
          val: function(v) {
            return v == 1;
          }
        }
      });

      child.set('val', 1);
      invalid = child.validate();

      expect(invalid).to.equal(true);

      child.set('val', 2);
      invalid = child.validate();

      expect(invalid).to.have.members(['val']);
    });
  });

  describe('events', function() {
    it('publishes events when setting properties', function() {
      var base = new Base({
        test: 'wat'
      });

      var setSpy = sinon.spy();
      var baseSetSpy = sinon.spy();

      base.on('set:test', setSpy);
      base.on('set', baseSetSpy);

      base.set('test',  'value');

      expect(setSpy).to.have.been.calledWith('value');
      expect(baseSetSpy).to.have.been.calledWith('test', 'value');
    });

    it('publishes events properly when setting with an object', function() {
      var base = new Base({
        test: 'wat'
      });

      var value = {
        test: 'changed',
        anotherProperty: 'added',
      }

      var setSpy = sinon.spy();
      var baseSetSpy = sinon.spy();

      base.on('set:anotherProperty', setSpy);
      base.on('set:test', setSpy);
      base.on('set', baseSetSpy);

      base.set(value);

      expect(setSpy).to.have.been.calledWith('changed');
      expect(setSpy).to.have.been.calledWith('added');
      expect(setSpy).to.have.been.called.twice;

      expect(baseSetSpy).to.have.been.calledWith(value);
      expect(baseSetSpy).to.have.been.called.once;
    });
  });

  describe('to json', function() {
    it('turns into json', function() {
      var base = new Base({
        testA: 'A'
      });

      expect(base.toJSON()).deep.equals({
        testA: 'A'
      });
    });
  });
});
