var search = document.querySelector('#query_ticket'),
	canOrder = document.querySelectorAll('.btn72'),
	trains = [],
	interval = 200;		// 默认200ms进行一次查询，可修改

function ticket(train, i) {
	// 1商务座 2特等座 3一等座 4二等座 5高级软卧 6软卧 7硬卧 8软座 9硬座 10无座
	// 此处为硬座或二等座, 可根据需求添加
	return train[i].parentNode.parentNode.querySelectorAll('td')[9].innerHTML
			|| parentNode.parentNode.querySelectorAll('td')[4].innerHTML;
}

(function timer(){
	setTimeout(function(){
		search.click();
		if(canOrder.length != 0){
			// 对所有有硬座或者二等座的车就行抢票
			for (var i = 0; i < canOrder.length; i++) {
				if(ticket(canOrder, i) != ('无' && '-')) {
					trains[i] = canOrder[i];
					trains[i].innerHTML = trains[i].innerHTML == '有' ? 9999 : trains[i].innerHTML;
				}
			};
			trains.sort(function (a, b) {
				return a > b;
			});
			// 仅对票数最多的车次进行预订
			// console.log(trains[0]);
			trains[0].click();
		} else {
			timer();
		}
	}, interval)
})()