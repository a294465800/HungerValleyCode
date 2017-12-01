$(function () {
  var $list = $('.list')
  var $listSub = $('.list-sub')
  $list.on('mouseover', function (e) {
    var $target = $(e.target)
    if ($target.hasClass('list-item')) {
      $listSub.css('display', 'none')
      $target.find('.list-sub').css('display', 'block')
    }
  })

  $list.on('mouseout', function (e) {
    $listSub.css('display', 'none')
  })

  $listSub.on('mouseover', function (e) {
    $(this).css('display', 'block')
  })
})