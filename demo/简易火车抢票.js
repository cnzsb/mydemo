var search = document.querySelector('#query_ticket'),
	canOrder = document.querySelectorAll('.btn72'),
	trains = [];
function ticket(train, i) {
	// 硬座，二等座
	return train[i].parentNode.parentNode.querySelectorAll('td')[9].innerHTML
			|| parentNode.parentNode.querySelectorAll('td')[4].innerHTML;
}

(function timer(){
	setTimeout(function(){
		search.click();
		if(canOrder){
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
	}, 200)
})()