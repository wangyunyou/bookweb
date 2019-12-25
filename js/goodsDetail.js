mui.init({
    swipeBack: true //启用右滑关闭功能
});
$('footer').addClass('store')

//主页面添加商品按钮
$('.add').on('click', function (e) {
    e.stopPropagation()
    var count = parseInt($(this).siblings('.count').text())
    count++
    if (count == 100) {
        count = 99
        mui.toast('不能再多了');
    }

    var stock = parseInt($(this).parent().parent().siblings('.detailBoxLeft').find('.stock').text())
    if (count >= stock) {
        count = stock
        mui.toast('库存不足');
    }

    $(this).removeClass('btnRed').siblings('.count').text(count).removeClass('none')
    $(this).children('.fa').removeClass('white')
    $(this).siblings('.reduce').removeClass('none')
})

//购物车添加商品按钮
$('.addGoodsList').on('click', function (e) {
    e.stopPropagation()
    var count = parseInt($(this).siblings('.countGoodsList').text())
    count++
    if (count == 100) {
        count = 99
        mui.toast('不能再多了');
    }

    var stock = parseInt($(this).parent().parent().siblings('.leftBox').find('.stock').text())
    if (count >= stock) {
        count = stock
        mui.toast('库存不足');
    }

    $(this).removeClass('btnRed').siblings('.countGoodsList').text(count).removeClass('none')
    $(this).children('.fa').removeClass('white')
    $(this).siblings('.reduceGoodsList').removeClass('none')
})

//主页面减少商品按钮
$('.reduce').on('click', function (e) {
    e.stopPropagation()
    var count = parseInt($(this).siblings('.count').text())
    count--
    console.log(count)
    $(this).siblings('.count').text(count)
    if (count == 0) {
        $(this).siblings('.count').text(count).addClass('none')
        $(this).siblings('.add').addClass('btnRed').children('.fa').addClass('white')
        $(this).addClass('none')
    }
})

//购物车减少商品按钮
$('.reduceGoodsList').on('click', function (e) {
    e.stopPropagation()
    var count = parseInt($(this).siblings('.countGoodsList').text())
    count--
    console.log(count)
    $(this).siblings('.countGoodsList').text(count)
    if (count == 0) {
        $(this).siblings('.countGoodsList').text(count).addClass('none')
        $(this).siblings('.addGoodsList').addClass('btnRed').children('.fa').addClass('white')
        $(this).addClass('none')
    }
})

//是否显示购物车列表
var hasShopList = false
$('.shopCar').on('click', function () {
    hasShopList = !hasShopList
    if (hasShopList) {
        $('.goodsList').css('height', '200px')
        $('.bottomTip').addClass('position')
        $('.bottomBar').addClass('position')
        $('body').append(`<div class="bigBg"></div>`);
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
    location.href = 'confirmOrder.html'
})

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