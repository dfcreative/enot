!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.enot=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';var f=module.exports={},h=require("matches-selector"),k=require("each-csv"),l=require("mutypes"),m=l.isString,n=l.isElement,p=l.isPlain,q=l.has,r=(0,eval)("this"),s=r.document,t={ENTER:13,ESCAPE:27,TAB:9,ALT:18,CTRL:17,SHIFT:16,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,LEFT_MOUSE:1,RIGHT_MOUSE:3,MIDDLE_MOUSE:2},$=r.jQuery,u=/\s*,\s*/;
function v(d,c,e){var a={},b=c.match(/\w+(?:\:\w+(?:\(.+\))?)*$/)[0];d=(c=c.slice(0,-b.length).trim())?/^[.#[]/.test(c)&&s?s.querySelectorAll(c):/^this\./.test(c)?w(d,c.slice(5)):c[0]===x?w(d,c.slice(1)):"this"===c?d:c===x?d:"body"===c?document.body:"root"===c?document.documentElement:w(r,c):d;a.c=d;b=("on"===b.slice(0,2)?b.slice(2):b).split(":");a.a=b.shift();a.b=b;e&&(a.d=y(e,a));return a}var x="@";
function w(d,c){for(var e=c.split("."),a=d,b;void 0!==(b=e.shift());){if(!q(a,b))return;a=a[b]}return a}function y(d,c){var e=d;c.b.sort(function(a){return/^one/.test(a)?1:-1}).forEach(function(a){var b=a.split("(")[0];a=a.slice(b.length+1,-1);f.b[b]&&(e=f.b[b](c.a,e,a))});return e}var z=new WeakMap,A=new WeakMap;f.on=function(d,c,e){m(d)&&(e=c,c=d,d=null);if(!c)return!1;k(c,function(a){B(d,a,e)})};var C=new WeakMap;
function B(d,c,e){if(void 0!==e){var a=v(d,c,e),b=a.c,g=a.d;if(b)if(b.length&&!n(b))for(d=b.length;d--;)B(b[d],a.a,g);else{if(p(e)){g=f.b.fire(c,null,e+"");C.has(d)||C.set(d,{});c=C.get(d);if(c[a.a])return;d&&(g=g.bind(d));c[a.a]=g}else if(g!==e){z.has(e)||z.set(e,{});d=z.get(e);if(d[a.a])return;d[a.a]=g}a=a.a;if(b&&b.addEventListener)if($)$(b).on(a,g);else b.addEventListener(a,g);else A.has(b)||A.set(b,{}),b=A.get(b),(b[a]=b[a]||[]).push(g)}}}
f.off=function(d,c,e){m(d)&&(e=c,c=d,d=null);c&&k(c,function(a){D(d,a,e)})};function D(d,c,e){if(void 0!==e){var a=v(d,c);c=a.c;var b=e;if(c)if(c.length&&!n(c))for(d=c.length;d--;)D(c[d],a.a,b);else{if(p(e)){d=C.get(d);if(!d)return;b=d[a.a];d[a.a]=null}else z.has(e)&&(d=z.get(e),d[a.a]&&(b=d[a.a],d[a.a]=null));a=a.a;if(c&&c.addEventListener)$?$(c).off(a,b):c.removeEventListener(a,b);else if(A.has(c)&&(c=A.get(c)[a]))for(a=0;a<c.length;a++)if(c[a]===b){c.splice(a,1);break}}}}
f.fire=function(d,c,e,a){m(d)&&(a=e,e=c,c=d,d=null);if(c instanceof Event)return F(d,c);if(!c)return!1;k(c,function(b){var c=v(d,b);return c.a?y(function(){var b=c.c;if(!b)return b;if(b.length&&!n(b))for(var d=b.length;d--;)F(b[d],c.a,e,a);else F(b,c.a,e,a)},c)():!1})};
function F(d,c,e,a){if(d&&d.addEventListener)if($){var b=$.Event(c,e);b.detail=e;a?$(d).trigger(b):$(d).triggerHandler(b)}else c instanceof Event?b=c:(b=s.createEvent("CustomEvent"),b.initCustomEvent(c,a,null,e)),d.dispatchEvent(b);else if(A.has(d)&&(a=A.get(d)[c]))for(var b=0,g=a.length;b<g;b++)a[b]&&a[b].call(d,{detail:e,type:c})}f.b={};f.b.one=function(d,c){function e(a){a=c&&c.call(this,a);1!==a&&f.off(this,d,e);return a}return e};
f.b.pass=function(d,c,e){e=e.split(u).map(G);return function(a){for(var b,d=e.length;d--;){b=e[d];var E="originalEvent"in a?a.originalEvent.which:a.which;if(b in t&&t[b]==E||E==b)return c.call(this,a)}return 1}};f.b.delegate=function(d,c,e){return function(a){var b=a.target;if(!n(b))return 1;for(;b&&b!==this;){if(h(b,e))return a.delegateTarget=b,Object.defineProperty(a,"currentTarget",{get:function(){return b}}),c.call(this,a);b=b.parentNode}return 1}};
f.b.not=function(d,c,e){return function(a){for(var b=a.target;b&&b!==this;){if(h(b,e))return 1;b=b.parentNode}return c.call(this,a)}};var H=new WeakMap;f.b.throttle=function(d,c,e){e=parseFloat(e);return function(a){var b=this;if(H.get(b))return 1;a=c.call(b,a);if(1===a)return a;H.set(b,setTimeout(function(){clearInterval(H.e);H.delete(b)},e))}};f.b.defer=function(d,c,e){e=parseFloat(e);return function(a){var b=this;setTimeout(function(){return c.call(b,a)},e)}};
f.b.fire=function(d,c,e){var a=e+"";return function(b){var c=this;k(a,function(a){F(c,a,b.detail)})}};function G(d){return d.toUpperCase()};

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