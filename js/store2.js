mui.init({
	swipeBack: true //启用右滑关闭功能
});
mui.ajax('../json/goods.json', {
	data: {},
	dataType: 'json', //服务器返回json格式数据
	type: 'get', //HTTP请求类型
	timeout: 10000, //超时时间设置为10秒；
	headers: {
		'Content-Type': 'application/json'
	},
	success: function (data) {
		var controls = document.getElementById("segmentedControls");
		var contents = document.getElementById("segmentedControlContents");
		var html = [];
		var shopCarHtml = []
		console.log(data)
		for (var i = 0; i < data.length; i++) {
			let element = data[i].varieties;
			html.push('<a class="mui-control-item" href="#content' + i + '">' + element + '</a>');
		}
		controls.innerHTML = html.join('');
		html = [];
		for (let i = 0; i < data.length; i++) {
			html.push('<div id="content' + i + '" class="mui-control-content"><ul class="mui-table-view goods">');
			let cardNum = data[i].goods.length
			for (var j = 0; j < cardNum; j++) {
				let item = data[i].goods[j]
				html.push(
					'<li class="mui-table-view-cell gtId' + item.gtId + '">' +
					'<div class="mui-card-content">' +
					'<div class="mui-card-content-inner">' +
					'<div class="leftBox">' +
					'<img src="' + item.product.productImg + '">' +
					'<div>' +
					'<p class="goodsName">' + item.product.productName + ' ' + item.weight + 'g</p>' +
					'<p class="weight">剩余 <span class="stock">' + item.productNumber + '</span></p>' +
					'<p>' +
					'<span class="colorRed">￥</span><span class="colorRed">' + item.price + '</span>' +
					'<span class="lineThrough">￥</span><span class="lineThrough">4.98</span>' +
					'</p>' +
					'</div>' +
					'</div>' +
					'<div class="rightBox">' +
					'<div class="positionBottom">' +
					'<button class="reduce none"><i class="fa fa-minus sIcon" aria-hidden="true"></i></button>' +
					'<span class="count none">0</span>' +
					'<button class="add btnRed"><i class="fa fa-plus sIcon white" aria-hidden="true"></i></button>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</li>'
				);
			}
			html.push('<div class="foot-blank"></div>');
			html.push('</ul></div>');
		}
		contents.innerHTML = html.join('');
		//默认选中第一个
		controls.querySelector('.mui-control-item').classList.add('mui-active');
		contents.querySelector('.mui-control-content').classList.add('mui-active');
		add()
		reduce()
	},
	error: function (xhr, type, errorThrown) {
		//异常处理；
		console.log(type);
	}
});

var hasShopList = false
$('.shopCar').on('click', function () {
	hasShopList = !hasShopList
	shopCarHtml = []
	$('#shopCar').html('<li class="totalTip">已选商品 <span>2</span> 件</li>')
	console.log(shopCarHtml)
	$('ul.goods li').each(function () {
		if ($(this).hasClass('addShopcar')) {
			shopCarHtml += $(this).prop("outerHTML")
		}
	})
	console.log(shopCarHtml)

	if (hasShopList) {
		$('.goodsList').css('height', '200px')
		$('.bottomTip').addClass('position')
		$('.bottomBar').addClass('position')
		$('body').append(`<div class="bigBg"></div>`);
		$('#shopCar').append(shopCarHtml)
		add()
		reduce()
	} else {
		$('.goodsList').css('height', '0')
		$('.bottomTip').removeClass('position')
		$('.bottomBar').removeClass('position')
		$('.bigBg').remove();
	}
	$('.bigBg').on('click', function () {
		hasShopList = !hasShopList
		$('.goodsList').css('height', '0')
		$('.bottomTip').removeClass('position')
		$('.bottomBar').removeClass('position')
		$('.bigBg').remove();
	})
})

$('#goShoppping').click(function () {
	location.href = "confirmOrder.html"
})
$('.searchBtn').click(function () {
	if ($('#search').val() == '') {
		mui.toast('请输入商品名称');
	} else {
		location.href = "searchResult.html"
	}
})

$('.mui-table-view li').on('click', function () {
	location.href = 'goodsDetail.html'
})

function add(e) {
	$('.add').unbind("click").bind("click", function (e) {
		e.stopPropagation()
		$(this).parents('li').addClass('addShopcar')
		var classList = $(this).parents('li').attr("class")

		console.log('as绝地反击卡洛斯建档立卡房间里卡见识到了会计分录科技爱丽丝肯德基里看风景埃里克森到家了快放假啊');

		$('ul li').each(function () {
			if ($(this).hasClass(classList)) {
				let count = parseInt($(this).find('.add').siblings('.count').text())
				count++
				if (count == 100) {
					count = 99
					mui.toast('不能再多了');
				}
				let stock = parseInt($(this).find('.add').parent().parent().siblings('.leftBox').find('.stock').text())
				if (count >= stock) {
					count = stock
					mui.toast('库存不足');
				}
				console.log(count)
				$(this).find('.add').removeClass('btnRed').siblings('.count').text(count).removeClass('none')
				$(this).find('.add').children('.fa').removeClass('white')
				$(this).find('.add').siblings('.reduce').removeClass('none')
			}
		})
		let hasCount = $('.count').text().split('')
		for (var x = 0; x < hasCount.length; x++) {
			if (hasCount[x] != 0) {
				$('footer').addClass('store')
			}
		}
	})
}

function reduce() {
	$('.reduce').unbind("click").bind("click", function (e) {
		e.stopPropagation()
		var classList = $(this).parents('li').attr("class")
		$('ul li').each(function () {
			if ($(this).hasClass(classList)) {
				let count = parseInt($(this).find('.reduce').siblings('.count').text())
				count--
				$(this).find('.reduce').siblings('.count').text(count)
				if (count == 0) {
					$(this).find('.reduce').siblings('.count').text(count).addClass('none')
					$(this).find('.reduce').siblings('.add').addClass('btnRed').children('.fa').addClass('white')
					$(this).find('.reduce').addClass('none')
					$(this).find('.reduce').parents('li').removeClass('addShopcar')
				}
				console.log(count)
			}
		})

		if ($('#shopCar').find('.count').text()) {
			let shopCar = $('#shopCar').find('.count').text().split('')
			shopCar.every(function (item) {
				if (item == 0) {
					$('.goodsList').css('height', '0')
					$('.bottomTip').removeClass('position')
					$('.bottomBar').removeClass('position')
					$('.bigBg').remove();
				}
			})
		}

		let hasCount = $('.count').text().split('')
		for (var y = 0; y < hasCount.length; y++) {
			if (hasCount[y] == 0 && isAllEqual(hasCount) == true) {
				$('footer').removeClass('store')
			} else {
				$('footer').addClass('store')
			}
		}
	})
}
//判断数组元素是否相同
function isAllEqual(array) {
	if (array.length > 0) {
		return !array.some(function (value, index) {
			return value !== array[0];
		});
	} else {
		return true;
	}
}




























//加载商品列表
// var controls = document.getElementById("segmentedControls");
// var contents = document.getElementById("segmentedControlContents");
// var html = [];
// var i = 0,
// 	j = 1,
// 	n = 5; //每个选项卡列表数量+1

// var data = ['蔬菜', '水果']
// for (i = 0; i < data.length; i++) {
// 	html.push('<a class="mui-control-item" href="#content' + i + '">' + data[i] + '</a>');
// }
// controls.innerHTML = html.join('');
// html = [];
// for (i = 0; i < data.length; i++) {
// 	html.push('<div id="content' + i + '" class="mui-control-content"><ul class="mui-table-view">');
// 	for (j = 1; j < n; j++) {
// 		html.push(
// 			'<li class="mui-table-view-cell">' +
// 			'<div class="mui-card-content">' +
// 			'<div class="mui-card-content-inner">' +
// 			'<div class="leftBox">' +
// 			'<img src="img/bocai.png">' +
// 			'<div>' +
// 			'<p class="goodsName">菠菜 250 g</p>' +
// 			'<p class="weight">剩余 <span class="stock">5</span></p>' +
// 			'<p>' +
// 			'<span class="colorRed">￥</span><span class="colorRed">3.98</span>' +
// 			'<span class="lineThrough">￥</span><span class="lineThrough">4.98</span>' +
// 			'</p>' +
// 			'</div>' +
// 			'</div>' +
// 			'<div class="rightBox">' +
// 			'<div class="positionBottom">' +
// 			'<button class="reduce none"><i class="fa fa-minus sIcon" aria-hidden="true"></i></button>' +
// 			'<span class="count none">0</span>' +
// 			'<button class="add btnRed"><i class="fa fa-plus sIcon white" aria-hidden="true"></i></button>' +
// 			'</div>' +
// 			'</div>' +
// 			'</div>' +
// 			'</div>' +
// 			'</li>'
// 		);
// 	}
// 	html.push('<div class="foot-blank"></div>');
// 	html.push('</ul></div>');
// }
// contents.innerHTML = html.join('');
// //默认选中第一个
// controls.querySelector('.mui-control-item').classList.add('mui-active');
// contents.querySelector('.mui-control-content').classList.add('mui-active');

// //主页面添加商品按钮
// $('.add').on('click', function (e) {
// 	e.stopPropagation()
// 	var count = parseInt($(this).siblings('.count').text())
// 	count++
// 	console.log(count)
// 	if (count == 100) {
// 		count = 99
// 		mui.toast('不能再多了');
// 	}

// 	var stock = parseInt($(this).parent().parent().siblings('.leftBox').find('.stock').text())
// 	if (count >= stock) {
// 		count = stock
// 		mui.toast('库存不足');
// 	}

// 	$('.add').removeClass('btnRed').siblings('.count').text(count).removeClass('none')
// 	$('.add').children('.fa').removeClass('white')
// 	$('.add').siblings('.reduce').removeClass('none')
// 	var hasCount = $('.count').text().split('')
// 	for (var x = 0; x < hasCount.length; x++) {
// 		if (hasCount[x] != 0) {
// 			$('footer').addClass('store')
// 		}
// 	}
// })
// //购物车添加商品按钮
// // $('.addGoodsList').on('click', function (e) {
// // 	e.stopPropagation()
// // 	var count = parseInt($(this).siblings('.countGoodsList').text())
// // 	count++
// // 	console.log(count)
// // 	if (count == 100) {
// // 		count = 99
// // 		mui.toast('不能再多了');
// // 	}

// // 	var stock = parseInt($(this).parent().parent().siblings('.leftBox').find('.stock').text())
// // 	if (count >= stock) {
// // 		count = stock
// // 		mui.toast('库存不足');
// // 	}

// // 	$(this).removeClass('btnRed').siblings('.countGoodsList').text(count).removeClass('none')
// // 	$(this).children('.fa').removeClass('white')
// // 	$(this).siblings('.reduceGoodsList').removeClass('none')
// // 	var hasCount = $('.countGoodsList').text().split('')
// // 	for (var x = 0; x < hasCount.length; x++) {
// // 		if (hasCount[x] != 0) {
// // 			$('footer').addClass('store')
// // 		}
// // 	}
// // })
// //主页面减少商品按钮
// $('.reduce').on('click', function (e) {
// 	e.stopPropagation()
// 	var count = parseInt($(this).siblings('.count').text())
// 	count--
// 	console.log(count)
// 	$('.reduce').siblings('.count').text(count)
// 	if (count == 0) {
// 		$('.reduce').siblings('.count').text(count).addClass('none')
// 		$('.reduce').siblings('.add').addClass('btnRed').children('.fa').addClass('white')
// 		$('.reduce').addClass('none')
// 	}
// 	var hasCount = $('.count').text().split('')
// 	for (var y = 0; y < hasCount.length; y++) {
// 		if (hasCount[y] == 0 && isAllEqual(hasCount) == true) {
// 			$('footer').removeClass('store')
// 		} else {
// 			$('footer').addClass('store')
// 		}
// 	}
// })
// //购物车减少商品按钮
// // $('.reduceGoodsList').on('click', function (e) {
// // 	e.stopPropagation()
// // 	var count = parseInt($(this).siblings('.countGoodsList').text())
// // 	count--
// // 	console.log(count)
// // 	$(this).siblings('.countGoodsList').text(count)
// // 	if (count == 0) {
// // 		$(this).siblings('.countGoodsList').text(count).addClass('none')
// // 		$(this).siblings('.addGoodsList').addClass('btnRed').children('.fa').addClass('white')
// // 		$(this).addClass('none')
// // 	}
// // 	var hasCount = $('.countGoodsList').text().split('')
// // 	for (var y = 0; y < hasCount.length; y++) {
// // 		if (hasCount[y] == 0 && isAllEqual(hasCount) == true) {
// // 			$('footer').removeClass('store')
// // 			$('.goodsList').css('height', '0')
// // 			$('.bottomTip').removeClass('position')
// // 			$('.bottomBar').removeClass('position')
// // 			$('.bigBg').remove();
// // 		} else {
// // 			$('footer').addClass('store')
// // 		}
// // 	}
// // })
// //是否显示购物车列表
// var hasShopList = false
// $('.shopCar').on('click', function () {
// 	hasShopList = !hasShopList
// 	if (hasShopList) {
// 		$('.goodsList').css('height', '200px')
// 		$('.bottomTip').addClass('position')
// 		$('.bottomBar').addClass('position')
// 		$('body').append(`<div class="bigBg"></div>`);
// 	} else {
// 		$('.goodsList').css('height', '0')
// 		$('.bottomTip').removeClass('position')
// 		$('.bottomBar').removeClass('position')
// 		$('.bigBg').remove();
// 	}
// 	$('.bigBg').on('click', function () {
// 		hasShopList = !hasShopList
// 		$('.goodsList').css('height', '0')
// 		$('.bottomTip').removeClass('position')
// 		$('.bottomBar').removeClass('position')
// 		$('.bigBg').remove();
// 	})
// })

// $('.mui-table-view li').on('click', function () {
// 	location.href = 'goodsDetail.html'
// })

// //判断数组元素是否相同
// function isAllEqual(array) {
// 	if (array.length > 0) {
// 		return !array.some(function (value, index) {
// 			return value !== array[0];
// 		});
// 	} else {
// 		return true;
// 	}
// }