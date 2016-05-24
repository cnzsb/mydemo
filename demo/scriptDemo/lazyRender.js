// @copyright: https://github.com/hanzichi/hanzichi.github.io/blob/master/2016/bigrender/js/bigrender.js

(function (win, doc) {
	/* bind 兼容 */
	Function.prototype.bind = Function.prototype.bind || function (context) {
		var that = this;
		return function () {
			return that.apply(context, arguments);
		};
	};

	var LazyRender = {
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
		getPos: function (ele) {
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
		getViewport: function () {
			var html = doc.documentElement;

			return {
				width: !win.innerWidth ? html.clientWidth : win.innerWidth,
				height: !win.innerHeight ? html.clientHeight : win.innerHeight
			};
		},
		getScrollHeight: function () {
			var html = doc.documentElement,
				bd = doc.body;
			return Math.max(win.pageYOffset || 0, html.scrollTop, bd.scrollTop);
		},
		getEleSize = function (ele) {
			return {
				width: ele.offsetWidth,
				height: ele.offsetHeight
			};
		},

		render: {
			threshold: 0,	// {Number} 阀值，预加载高度，单位px
			eles: null,		// {Array} 需延迟加载的元素集合
			fn: null,		// {Function} scroll、resize、touchmove 所绑定的方法，等价于 pollTextareas()

			evalScripts: function (code) {
				var head = doc.getElementsByTagName('head')[0],
					script = doc.createElement('script');

				script.type = 'text/javascript';
				script.text = code;
				head.appendChild(script);
			},
			evalStyles: function (code) {
				var head = doc.getElementsByTagName('head')[0],
					style = doc.createElement('style');

				style.type = 'text/css';
				try {
					style.appendChild(doc.createTextNode(code));
				} catch (e) {
					style.styleSheets.cssText = code;
				}
				head.appendChild(style);
			},
			extractCode: function (str, isStyle) {
				var cata = isStyle ? 'style' : 'script',
					scriptFragment = '<' + cata + '[^>]*>([\\S\\s]*?)</' + cata + '\\s',
					matchAll = new RegExp(scriptFragment, 'img'),
					matchOne = new RegExp(scriptFragment, 'im'),
					matchResults = str.match(matchAll) || [],
					ret = [];

				for (var i = 0, len = matchResults.length; i < len; i++) {
					var temp = (matchResults[i].match(matchOne)) || ['', ''][1];
					if (temp) {
						ret.push(temp);
					}
				}

				return ret;
			}
		}
	};
})(window, document)