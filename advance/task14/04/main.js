$(function () {
  var $nav = $('.nav-bar')
  $nav.on('click', function (e) {
    var items = $(this).find('.nav-item')
    items.removeClass('active')
    $(e.target).addClass('active')

    var index = $(e.target).index()
    var $swiper = $('.swiper')
    $swiper.stop()
    $swiper.animate({
      left: index * (-600) + 'px'
    }, 500)
  })
})