var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai)

var Base = require('../../src/models/base.js');

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

      expect(base.props.testA).to.equal('A');
      expect(base.props.testB).to.equal('B');

      base.testA = 'AA';
      base.testB = 'BB';

      expect(base.props.testA).to.equal('AA');
      expect(base.props.testB).to.equal('BB');
    });
  });

  describe('extending', function() {
    it('extends onto new objects', function() {
      var Child = Base.extend({ });
      var child = new Child({ test: 'A' });
      expect(child.props.test).to.equal('A');
    });
  });

  describe('validation', function() {
    it('does not set invalid properties', function() {
      var Child = Base.extend({
        validators: {
          val: function(v) {
            return v == 1;
          }
        }
      });

      var child = new Child({ val: 0 });
      expect(child.props.val).to.equal(undefined);

      child.val = 1;
      expect(child.props.val).to.equal(1);

      child.val = 2;
      expect(child.props.val).to.equal(1);
    });
  });

  describe('events', function() {
    it('publishes events when setting properties', function() {
      var base = new Base({
        test: 'wat'
      });

      var setSpy = sinon.spy();
      var baseSetSpy = sinon.spy();

      base.emitter.on('set:test', setSpy);
      base.emitter.on('set', baseSetSpy);

      base.test = 'value';

      expect(setSpy).to.have.been.calledWith('value');
      expect(baseSetSpy).to.have.been.calledWith('test', 'value');
    });
  });

  describe('registering properties', function() {
    it('can register a new property', function() {
      var base = new Base({
        testA: 'A'
      });

      base.defineProperty('testB');

      base.testB = 'B';

      expect(base.props.testA).to.equal('A');
      expect(base.props.testB).to.equal('B');

    });
  });

  describe('to json', function() {
    it('turns into json', function() {
      var base = new Base({
        testA: 'A'
      });

      expect(base.toJson()).deep.equals({
        testA: 'A'
      });
    });
  });
});
