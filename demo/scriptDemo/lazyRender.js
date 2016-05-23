// https://github.com/hanzichi/hanzichi.github.io/blob/master/2016/bigrender/js/bigrender.js

(function (win, doc) {
	/* bind 兼容 */
	Function.prototype.bind = Function.prototype.bind || function (context) {
		var that = this;
		return function () {
			return that.apply(context, arguments);
		};
	};

	var LasyRender = {
		getElementsByClassName: function (cls) {
			if (doc.getElementsByName) {
				return doc.getElementsByClassName(cls);
			}

			var allTags = doc.getElementsByTagName('*'),
			    aCls = [],
			    reg = new RegExp('\\b' + cls + '\\b', 'i');
			for (var i = 0, tmp, len = allTags.length; i < len; i++) {
				(tmp = allTags[i]) && reg.test(tmp.className) && aCls.push(tmp);
			}

			return aCls;
		},
		addEvent: function (ele, type, fn) {
			ele.addEventListener ? ele.addEventListener(type, fn, false) : ele.attachEvent('on' + type, fn);
		},
		removeEvent: function (ele, type, fn) {
			ele.removeEventListener ? ele.removeEventListener(type, fn, false) : ele.detachEvent('on' + type, fn);
		},
		getPos = function (ele) {
			var pos = {
				x: 0,
				y: 0
			};
			while (ele.offsetParent) {
				pos.x += ele.offsetLeft;
				pos.y += ele.offsetTop;
				ele = ele.offsetParent;
			}

			return pos;
		},
		getViewport = function () {
			var html = doc.documentElement;

			return {
				width: !win.innerWidth ? html.clientWidth : win.innerWidth,
				height: !win.innerHeight ? html.clientHeight : win.innerHeight
			};
		},
		getScrollHeight = function () {
			var html = doc.documentElement,
				bd = doc.body;
			return Math.max(win.pageYOffset || 0, html.scrollTop, bd.scrollTop)
		},
		getEleSize = function (ele) {
			return {
				width: ele.offsetWidth,
				height: ele.offsetHeight
			};
		}
	};
})(window, document)