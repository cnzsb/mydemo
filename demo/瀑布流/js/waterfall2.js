/*
 * 瀑布流2（IE8以上）
 * @authors cnzsb
 * @date    2015-12-30 23:37:36
 * BUG: 滚动后加载引起的动画问题待修复
 */

$(function () {	
	randomPlace('#container', '.box');
	setTimeout(function () {
		waterfall('#container', '.box');
	}, 1000);

	$(window).resize(function () {
		waterfall('#container', '.box');
	});

	// 模拟服务器发回的数据
	var dataInt = {'data':[{'src':'07.jpg'},{'src':'06.jpg'},{'src':'05.jpg'},{'src':'04.jpg'},{'src':'03.jpg'},{'src':'02.jpg'},{'src':'01.jpg'}]};

	$(window).scroll(function () {
		var $container = $('#container'),
			$box = $container.find('.box'),
			lastBoxTop = $box.last().outerHeight() / 4 + $box.last().offset().top,
			viewTop = $(window).height() + $(window).scrollTop();

		if (lastBoxTop < viewTop) {
			$(dataInt.data).each(function () {
				var $nEle = $('<div class="box"><div class="pic"><img></div></div>').appendTo('#container'),
					$nImg = $nEle.find('img');
				// console.log(this.src);
				$nImg.attr('src', 'images/' + this.src);
			});

			waterfall('#container', '.box');
		}
	});
});

function waterfall(parent, son) {
	var $container = $(parent),
		$box = $container.find(son),
		boxW = $box.eq(0).outerWidth(),
		cols = Math.floor($(window).width() / boxW),
		aBoxH = [];

	$container.css({
		'width': boxW * cols,
		'margin': '0 auto'
	});	

	$box.each(function (i) {
		var $this = $(this);
		if (i < cols) {
			aBoxH[i] = $this.outerHeight();
			$this.animate({'margin': '0'}, 500).css('position', '');
		} else {
			var aBoxMinH = Math.min.apply(null, aBoxH),
				aBoxMinIndex = $.inArray(aBoxMinH, aBoxH);
			// console.log(aBoxH);

			$this.css('position', 'absolute')
				.animate({
					'margin': '0',
					'top': aBoxMinH,
					'left': aBoxMinIndex * boxW
				}, 500);

			aBoxH[aBoxMinIndex] += $this.outerHeight();
		}
	});	
}

// 随机放置
function randomPlace(parent, son) {
	var $container = $(parent),
		$box = $container.find(son);

	// 初始随机排列在窗口中央
	$box.css('position', 'absolute');
	$('.box').each(function () {
			var $this = $(this);
			console.log($this.outerHeight());
			$this.css({
				'top': ($(window).height() - $this.outerHeight()) / 2,
				'left': ($(window).width() - $this.outerWidth()) / 2,
				'margin-top':  (Math.random() * 10 - 6) * 10,
				'margin-left': (Math.random() * 10 - 6) * 50
			});
		});
}