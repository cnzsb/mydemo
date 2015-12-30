/*
 * 瀑布流2（IE8以上）
 * @authors cnzsb
 * @date    2015-12-30 15:40:47
 */

$(function () {
	
	waterfall('#container', '.box');

	$(window).resize(function () {
		waterfall('#container', '.box');
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

	// 初始随机排列在窗口中央
	$('.box').each(function () {
		var $this = $(this);
		$this.css({
			'position': 'absolute',
			'top': ($(window).height() - $this.outerHeight()) / 2,
			'left': ($(window).width() - $this.outerWidth()) / 2,
			'margin-top':  (Math.random() * 10 - 6) * 10,
			'margin-left': (Math.random() * 10 - 6) * 50
		});
	});

	setTimeout(function () {
		$box.each(function (i) {
			var $this = $(this);
			if (i < cols) {
				aBoxH[i] = $this.outerHeight();
				$this.animate({'margin': '0'}, 500).css('position', '');
			} else {
				var aBoxMinH = Math.min.apply(null, aBoxH),
					aBoxMinIndex = $.inArray(aBoxMinH, aBoxH);
				console.log(aBoxH);

				$this.animate({
						'margin': '0',
						'top': aBoxMinH,
						'left': aBoxMinIndex * boxW
					}, 500);

				aBoxH[aBoxMinIndex] += $this.outerHeight();
			}
		});
	}, 1000);
	
}