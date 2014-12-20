/**
 * component/emitter compliance tests
 *
 * https://github.com/component/emitter/blob/master/test/emitter.js
 */


var WeakMap = typeof WeakMap !== 'undefined' ? WeakMap : require('./weakmap');

var doc = typeof document === 'undefined' ? undefined : document;
var win = typeof window === 'undefined' ? undefined : window;

var Emitter = doc && typeof Emitter !== 'undefined' ? Emitter : require('..');
var should = typeof chai !== 'undefined' ? chai.should() : require('chai').should();


function Custom() {
  Emitter.call(this);
}

// Custom.prototype.__proto__ = Emitter.prototype;
Custom.prototype = Object.create(Emitter.prototype);

describe('Custom', function(){
  describe('with Emitter.call(this)', function(){
    it('should work', function(done){
      var emitter = new Custom;
      emitter.on('foo', function(){done()});
      emitter.emit('foo');
    })
  })
})

describe('Emitter', function(){
  describe('.on(event, fn)', function(){
    it('should add listeners', function(){
      var emitter = new Emitter;
      var calls = [];

      emitter.on('foo', function(val){
        calls.push('one', val);
      });

      emitter.on('foo', function(val){
        calls.push('two', val);
      });

      emitter.emit('foo', 1);
      emitter.emit('bar', 1);
      emitter.emit('foo', 2);

      calls.should.eql([ 'one', 1, 'two', 1, 'one', 2, 'two', 2 ]);
    })
  })

  describe('.once(event, fn)', function(){
    it('should add a single-shot listener', function(){
      var emitter = new Emitter;
      var calls = [];

      emitter.once('foo', function(val){
        calls.push('one', val);
      });

      emitter.emit('foo', 1);
      emitter.emit('foo', 2);
      emitter.emit('foo', 3);
      emitter.emit('bar', 1);

      calls.should.eql([ 'one', 1 ]);
    })
  })

  describe('.off(event, fn)', function(){
    it('should remove a listener', function(){
      var emitter = new Emitter;
      var calls = [];

      function one() { calls.push('one'); }
      function two() { calls.push('two'); }

      emitter.on('foo', one);
      emitter.on('foo', two);
      emitter.off('foo', two);

      emitter.emit('foo');

      calls.should.eql([ 'one' ]);
    })

    it('should work with .once()', function(){
      var emitter = new Emitter;
      var calls = [];

      function one() { calls.push('one'); }

      // console.log('---once1')
      emitter.once('foo', one);
      // console.log('---once2')
      emitter.once('fee', one);
      // console.log('---off')
      emitter.off('foo', one);

      emitter.emit('foo');

      calls.should.eql([]);
    })

    it('should work when called from an event', function(){
      var emitter = new Emitter
        , called
      function b () {
        called = true;
      }
      emitter.on('tobi', function () {
        emitter.off('tobi', b);
      });
      emitter.on('tobi', b);
      emitter.emit('tobi');
      called.should.be.true;
      called = false;
      emitter.emit('tobi');
      called.should.be.false;
    });
  })

  describe('.off(event)', function(){
    it('should remove all listeners for an event', function(){
      var emitter = new Emitter;
      var calls = [];

      function one() { calls.push('one'); }
      function two() { calls.push('two'); }

      emitter.on('foo', one);
      emitter.on('foo', two);
      emitter.off('foo');

      emitter.emit('foo');
      emitter.emit('foo');

      calls.should.eql([]);
    })
  })

  describe('.off()', function(){
    it('should remove all listeners', function(){
      var emitter = new Emitter;
      var calls = [];

      function one() { calls.push('one'); }
      function two() { calls.push('two'); }

      emitter.on('foo', one);
      emitter.on('bar', two);

      emitter.emit('foo');
      emitter.emit('bar');

      emitter.off();

      emitter.emit('foo');
      emitter.emit('bar');

      calls.should.eql(['one', 'two']);
    })
  })

  describe('.listeners(event)', function(){
    describe('when handlers are present', function(){
      it('should return an array of callbacks', function(){
        var emitter = new Emitter;
        function foo(){}
        emitter.on('foo', foo);
        emitter.listeners('foo').should.eql([foo]);
      })
    })

    describe('when no handlers are present', function(){
      it('should return an empty array', function(){
        var emitter = new Emitter;
        emitter.listeners('foo').should.eql([]);
      })
    })
  })

  describe('.hasListeners(event)', function(){
    describe('when handlers are present', function(){
      it('should return true', function(){
        var emitter = new Emitter;
        emitter.on('foo', function(){});
        emitter.hasListeners('foo').should.be.true;
      })
    })

    describe('when no handlers are present', function(){
      it('should return false', function(){
        var emitter = new Emitter;
        emitter.hasListeners('foo').should.be.false;
      })
    })
  })
})

describe('Emitter(obj)', function(){
  it('should mixin', function(done){
    var proto = {};
    Emitter(proto);
    proto.on('something', done);
    proto.emit('something');
  })
})