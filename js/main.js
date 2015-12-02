/**
 * @authors cnzsb
 * @date    2015-12-02 16:43:20
 */

$(function () {
	var $demos = $('#content').find('a'),
		$demoslen = $demos.length,
		$newest = $('#newest'),
		reg = new RegExp("^demo\/(.*)\.html$", "i");
		// console.log(reg.exec($demos.attr('href'))[1]);

		$demos.each(function (i) {
			var $this = $(this),
				$num = $demoslen - i + '. ',
				$demoname = reg.exec($this.attr('href'))[1];
			
			$this.html($num + $demoname + '<br />');

			// 最近的Demo
			if(i == 0){
				$newest.attr('href', reg.exec($this.attr('href'))[0])
					.html($demoname);
			}
		});
});