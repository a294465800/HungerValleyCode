$(function () {
  var $more = $('#more')
  var $list = $('.list')
  var index = 3

  $more.on('click', function () {
    var random = Math.floor(Math.random() * 10) + 1
    for (var i = 0; i < random; i++) {
      var text = '内容' + (index++)
      $list.append(createLi(text))
    }
  })

  function createLi(text) {
    var $li = $("<li></li>")
    $li.addClass('list-item')
    $li.text(text)
    return $li
  }
})