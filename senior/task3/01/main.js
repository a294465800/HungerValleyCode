! function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) : (global.Tab = factory())
}(this, (function () {

  var _helper = {
    getNode: function (selector) {
      this.parentNode = document.querySelector(selector)
      return this
    },

    getNodes: function (selector) {
      this.children = document.querySelectorAll(selector)
      return this
    },

    indexOf: function (node) {
      if (this.children && this.children.length < 1) {
        return -1
      }
      for (var i = 0; i < this.children.length; i++)
        if (node === this.children[i]) {
          return i
        }
      return -1
    },

    addClass: function (nodes) {
      if (this.currentIndex === -1) {
        return
      }
      this.children[this.currentIndex].classList.add(this.activeClass)
    },

    removeClass: function (nodes) {
      if (nodes.length < 1) {
        return
      }
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].classList.remove(this.activeClass)
      }
    }
  }

  for (var key in _helper) {
    Tab.prototype[key] = _helper[key]
  }

  function Tab(options) {
    if (!options.parentNode) {
      console.error('parentNode is necessary！')
      return
    } else if (!options.children) {
      console.error('children is necessary！')
      return
    }
    this.getNode(options.parentNode).getNodes(options.children)
    this.activeClass = options.activeClass || 'active'
    this.init()
  }

  Tab.prototype.init = function () {
    this.currentIndex = 0
    this.handleClick()
  }

  Tab.prototype.handleClick = function () {
    var self = this
    self.parentNode.addEventListener('click', function (event) {
      self.currentTarget = event.target
      self.currentIndex = self.indexOf(self.currentTarget)
      self.removeClass(self.children)
      self.addClass(self.currentTarget)
      if (self.handleClickCallback) {
        self.handleClickCallback({
          index: self.currentIndex,
          target: self.currentTarget
        }, event)
      } else {
        console.warn('missing tab callback function!')
      }
    })
  }

  return Tab
}))