! function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? (module.exports = factory()) :
    typeof define === 'function' && define.amd ? define(factory) : (global.Lazyload = factory())
}(this, (function () {

  var _helper = {
    timer: null,
    throttle: function (callback, timeout) {
      var self = this
      clearTimeout(this.timer)
      this.timer = setTimeout(function () {
        typeof callback === 'function' && callback()
      }, timeout);
    }
  }

  for (var key in _helper) {
    Lazyload.prototype[key] = _helper[key]
  }

  function Lazyload(options) {
    if (!options.parentNode) {
      console.error('parentNode is neccessary!')
      return
    } else if (!options.imgNodes) {
      console.error('imgNodes is neccessary!')
      return
    } else if (!options.dataKey) {
      console.error('dataKey is neccessary!')
      return
    }
    this.parentNode = document.querySelector(options.parentNode)
    this.imgNodes = document.querySelectorAll(options.imgNodes)
    this.dataKey = options.dataKey
    this.timer = null
    this.init()
  }

  Lazyload.prototype.init = function () {
    this.handleScroll()
    this.check()
  }

  Lazyload.prototype.handleScroll = function () {
    var self = this
    window.addEventListener('scroll', function (e) {
      self.throttle(function () {
        self.check()
      }, 200)
    })
  }

  Lazyload.prototype.check = function () {
    for (var i = 0; i < this.imgNodes.length; i++) {
      if (this.imgNodes[i].dataset.show) {
        continue
      }
      if (this.isVisible(this.imgNodes[i])) {
        this.imgNodes[i].src = this.imgNodes[i].dataset[this.dataKey]
        this.imgNodes[i].dataset.show = 1
      }
    }
  }

  Lazyload.prototype.isVisible = function (node) {
    var nodeHeight = parseFloat(getComputedStyle(node).height)
    var nodeOffset = parseFloat(node.offsetTop)
    if (window.pageYOffset < nodeHeight + nodeOffset && window.innerHeight + window.pageYOffset > nodeOffset) {
      return true
    }
    return false
  }

  return Lazyload
}))