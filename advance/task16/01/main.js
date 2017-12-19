! function () {
  window.onload = function () {
    function isVisible(node) {
      var currentTop = window.pageYOffset
      var currentHeight = window.innerHeight
      var nodeTop = node.offsetTop
      if (nodeTop < currentTop + currentHeight && nodeTop > currentTop) {
        return true
      }
      return false
    }

    var imgs = document.querySelectorAll('.img')

    function addImg(imgs) {
      imgs.forEach(function (it, index) {
        if (it.src === 'http://i4.download.fd.pchome.net/g1/M00/12/0D/oYYBAFZ6VAiIRQxyAABgC3PvZg8AAC0QgEacO4AAGAj844.jpg' && isVisible(it)) {
          it.src = it.dataset.src
        }
      })
    }
    addImg(imgs)
    window.addEventListener('scroll', function () {
      addImg(imgs)
    })
  }
}()