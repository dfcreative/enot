!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.enot=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';var g=module.exports={},h=require("matches-selector"),k=require("each-csv"),l=require("mutypes"),m=l.isString,n=l.isElement,p=l.isPlain,q=(0,eval)("this"),r=q.document,s={ENTER:13,ESCAPE:27,TAB:9,ALT:18,CTRL:17,SHIFT:16,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,LEFT_MOUSE:1,RIGHT_MOUSE:3,MIDDLE_MOUSE:2},$=q.jQuery,t=/\s*,\s*/;
function u(a,d,b){var c={},e=d.match(/\w+(?:\:\w+(?:\(.+\))?)*$/)[0];a=(d=d.slice(0,-e.length).trim())?/^[.#[]/.test(d)&&r?r.querySelectorAll(d):/^this\./.test(d)?v(a,d.slice(5)):d[0]===w?v(a,d.slice(1)):"this"===d?a:d===w?a:"body"===d?document.body:"root"===d?document.documentElement:v(q,d):a;c.c=a;e=("on"===e.slice(0,2)?e.slice(2):e).split(":");c.a=e.shift();c.b=e;b&&(c.d=x(b,c));return c}var w="@";function v(a,d){for(var b=d.split("."),c=a,e;void 0!==(e=b.shift());)c=c[e];return c}
function x(a,d){var b=a;d.b.sort(function(c){return/^one/.test(c)?1:-1}).forEach(function(c){var a=c.split("(")[0];c=c.slice(a.length+1,-1);g.b[a]&&(b=g.b[a](d.a,b,c))});return b}var y=new WeakMap,z=new WeakMap;g.on=function(a,d,b){m(a)&&(b=d,d=a,a=null);if(!d)return!1;k(d,function(c){A(a,c,b)})};var B={};
function A(a,d,b){var c=u(a,d,b),e=c.c,f=c.d;if(e)if(e.length&&!n(e))for(a=e.length;a--;)A(e[a],c.a,f);else{void 0===b&&(f=b=e[c.a]);if(p(b))b+="",f=g.b.fire(d,null,b),a&&(f=f.bind(a)),(B[b]=B[b]||{})[c.a]=f;else if(f!==b){y.has(b)||y.set(b,{});a=y.get(b);if(a[c.a])return;a[c.a]=f}c=c.a;if(e&&e.addEventListener)if($)$(e).on(c,f);else e.addEventListener(c,f);else z.has(e)||z.set(e,{}),e=z.get(e),(e[c]=e[c]||[]).push(f)}}g.off=function(a,d,b){m(a)&&(b=d,d=a,a=null);d&&k(d,function(c){C(a,c,b)})};
function C(a,d,b){var c=u(a,d);a=c.c;d=b;if(a)if(a.length&&!n(a))for(b=a.length;b--;)C(a[b],c.a,d);else if(void 0===b&&(d=b=a[c.a]),p(b)?(b+="",B[b]&&(d=B[b][c.a],B[b][c.a]=null)):y.has(b)&&(b=y.get(b),b[c.a]&&(d=b[c.a],b[c.a]=null)),c=c.a,a&&a.addEventListener)$?$(a).off(c,d):a.removeEventListener(c,d);else if(z.has(a)&&(a=z.get(a)[c]))for(c=0;c<a.length;c++)if(a[c]===d){a.splice(c,1);break}}
g.fire=function(a,d,b,c){m(a)&&(c=b,b=d,d=a,a=null);if(d instanceof Event)return D(a,d);if(!d)return!1;k(d,function(e){var d=u(a,e);return d.a?x(function(){var a=d.c;if(!a)return a;if(a.length&&!n(a))for(var e=a.length;e--;)D(a[e],d.a,b,c);else D(a,d.a,b,c)},d)():!1})};
function D(a,d,b,c){if(a&&a.addEventListener)if($){var e=$.Event(d,b);e.detail=b;c?$(a).trigger(e):$(a).triggerHandler(e)}else d instanceof Event?e=d:(e=r.createEvent("CustomEvent"),e.initCustomEvent(d,c,null,b)),a.dispatchEvent(e);else if(z.has(a)&&(c=z.get(a)[d]))for(var e=0,f=c.length;e<f;e++)c[e]&&c[e].call(a,{detail:b,type:d})}g.b={};g.b.one=function(a,d){function b(c){c=d&&d.call(this,c);1!==c&&g.off(this,a,b);return c}return b};
g.b.pass=function(a,d,b){b=b.split(t).map(F);return function(c){for(var a,f=b.length;f--;){a=b[f];var E="originalEvent"in c?c.originalEvent.which:c.which;if(a in s&&s[a]==E||E==a)return d.call(this,c)}return 1}};g.b.delegate=function(a,d,b){return function(a){var e=a.target;if(!n(e))return 1;for(;e&&e!==this;){if(h(e,b))return a.delegateTarget=e,Object.defineProperty(a,"currentTarget",{get:function(){return e}}),d.call(this,a);e=e.parentNode}return 1}};
g.b.not=function(a,d,b){return function(a){for(var e=a.target;e&&e!==this;){if(h(e,b))return 1;e=e.parentNode}return d.call(this,a)}};var G=new WeakMap;g.b.throttle=function(a,d,b){b=parseFloat(b);return function(a){var e=this;if(G.get(e))return 1;a=d.call(e,a);if(1===a)return a;G.set(e,setTimeout(function(){clearInterval(G.e);G.delete(e)},b))}};g.b.defer=function(a,d,b){b=parseFloat(b);return function(a){var e=this;setTimeout(function(){return d.call(e,a)},b)}};
g.b.fire=function(a,d,b){var c=b+"";return function(a){var b=this;k(c,function(c){D(b,c,a.detail)})}};function F(a){return a.toUpperCase()};

},{"each-csv":2,"matches-selector":3,"mutypes":4}],2:[function(require,module,exports){
module.exports = eachCSV;

//match every comma-separated element ignoring 1-level parenthesis, like `1,2(3,4),5`
var commaMatchRe = /(,[^,]*?(?:\([^()]+\)[^,]*)?)(?=,|$)/g

//iterate over every item in string
function eachCSV(str, fn){
	if (typeof str !== 'string') return;

	var list = (',' + str).match(commaMatchRe) || [''];
	for (var i = 0; i < list.length; i++) {
		// console.log(matchStr)
		var matchStr = list[i].trim();
		if (matchStr[0] === ',') matchStr = matchStr.slice(1);
		matchStr = matchStr.trim();
		fn(matchStr, i);
	}
};
},{}],3:[function(require,module,exports){
'use strict';

var proto = Element.prototype;
var vendor = proto.matches
  || proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] == el) return true;
  }
  return false;
}
},{}],4:[function(require,module,exports){
/**
* Trivial types checkers.
* Because there’re no common lib for that ( lodash_ is a fatguy)
*/
var _ = module.exports = {
	//speedy impl,ementation of `in`
	//NOTE: `!target[propName]` 2-3 orders faster than `!(propName in target)`
	has: function(a, b){
		if (!a) return false;
		//NOTE: this causes getter fire
		if (a[b]) return true;
		return b in a;
		// return a.hasOwnProperty(b);
	},

	//isPlainObject
	isObject: function(a){
		var Ctor, result;

		if (_.isPlain(a) || _.isArray(a) || _.isElement(a) || _.isFn(a)) return false;

		// avoid non `Object` objects, `arguments` objects, and DOM elements
		if (
			//FIXME: this condition causes weird behaviour if a includes specific valueOf or toSting
			// !(a && ('' + a) === '[object Object]') ||
			(!_.has(a, 'constructor') && (Ctor = a.constructor, isFn(Ctor) && !(Ctor instanceof Ctor))) ||
			!(typeof a === 'object')
			) {
			return false;
		}
		// In most environments an object's own properties are iterated before
		// its inherited properties. If the last iterated property is an object's
		// own property then there are no inherited enumerable properties.
		for(var key in a) {
			result = key;
		};

		return typeof result == 'undefined' || _.has(a, result);
	},

	isFn: function(a){
		return !!(a && a.apply);
	},

	isString: function(a){
		return typeof a === 'string'
	},

	isNumber: function(a){
		return typeof a === 'number'
	},

	isBool: function(a){
		return typeof a === 'boolean'
	},

	isPlain: function(a){
		return !a || _.isString(a) || _.isNumber(a) || _.isBool(a);
	},

	isArray: function(a){
		return a instanceof Array;
	},

	isElement: function(target){
		return target instanceof HTMLElement
	},

	isPrivateName: function(n){
		return n[0] === '_' && n.length > 1
	}
}
},{}]},{},[1])(1)
});