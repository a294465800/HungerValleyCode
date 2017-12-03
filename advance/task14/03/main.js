$(function () {

  var $list = $('.list')
  $list.on('mouseover', function (e) {
    var $listItems = $(this).find('.list-item')
    var target = e.target
    var tagName = target.tagName.toLowerCase()
    var $masks = $('.list-item-mask')
    var $target
    if (tagName === 'ul') {
      return false
    }
    if (tagName === 'a') {
      return false
    }
    $target = $(target)
    if (tagName !== 'li') {
      $target = $target.parent('.list-item')
    }
    $masks.stop()
    $masks.animate({
      opacity: 0
    }, 200)

    var $mask = $target.find('.list-item-mask')
    $mask.stop()
    $mask.animate({
      opacity: 1
    }, 500)


    var $container = $('.container')
    $container.on('mouseover', function (e) {
      if ($(e.target).hasClass('container')) {
        var $masks = $('.list-item-mask')
        $masks.stop()
        $masks.animate({
          opacity: 0
        }, 200)
      }
    })
  })

  var $more = $('#more')
  var products = [{
    img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
    name: '珂兰 黄金手 猴哥款',
    price: '￥405.00'
  }, {
    img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
    name: '珂兰 黄金转运珠 猴哥款',
    price: '￥100.00'
  }, {
    img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
    name: '珂兰 黄金手链 3D猴哥款',
    price: '￥45.00'
  }]
  $more.on('click', function (e) {
    var $list = $('.list')
    for (var i = 0; i < products.length; i++) {
      var tmp = `
      <li class="list-item">
      <img class="list-item-img" src="${products[i].img}" alt="${products[i].name}">
      <p class="list-item-name">${products[i].name}</p>
      <p class="list-item-price">${products[i].price}</p>
      <div class="list-item-mask">
        <a class="list-item-btn" href="#">购买</a>
      </div>
    </li>
    `
      $list.append(tmp)
    }
  })
})