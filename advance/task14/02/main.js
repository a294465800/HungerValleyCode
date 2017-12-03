$(function () {
  var $nav = $('.nav-bar')

  $nav.on('click', function (e) {
    var $target = $(e.target)
    var $navItems = $('.nav-bar-item')
    var $contents = $('.list-wrap')
    var index = $target.index()
    $navItems.removeClass('active')
    $contents.removeClass('active')
    $target.addClass('active')
    $($contents[index]).addClass('active')
  })

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
})