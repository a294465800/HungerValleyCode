! function () {
  window.onload = function () {

    //随机背景颜色 + 高度
    function randomColor(node) {
      node.style.backgroundColor = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')'
      node.style.height = 100 + Math.random() * 200 + 'px'
    }

    function initBackground() {
      var listItem = document.querySelectorAll('.list-item')

      for (var i = 0; i < listItem.length; i++) {
        randomColor(listItem[i])
      }
    }

    initBackground()

    function Waterfall(options) {
      this.parentNode = options.parentNode
      this.childrenNode = options.childrenNode
      this.unit = 'px'
      this.margin = 10
    }

    Waterfall.prototype.init = function () {

      this.parentWidth = parseFloat(getComputedStyle(this.parentNode).width)
      this.childWidth = this.childrenNode[0].offsetWidth + this.margin
      this.colNum = Math.floor(this.parentWidth / this.childWidth)
      this.offset = []
      for (var i = 0; i < this.colNum; i++) {
        this.offset.push(0)
      }
      this.place()
    }

    /**
     * 计算顶部摆放位置
     */
    Waterfall.prototype.calculateTop = function () {
      this.minTop = Math.min.apply(null, this.offset)
      this.minIndex = this.offset.indexOf(this.minTop)
    }

    /**
     * 摆放
     */
    Waterfall.prototype.place = function () {
      for (var i = 0; i < this.childrenNode.length; i++) {
        this.calculateTop()
        this.childrenNode[i].style.top = this.minTop + this.unit
        this.childrenNode[i].style.left = this.childWidth * this.minIndex + this.unit
        this.offset[this.minIndex] = this.minTop + this.childrenNode[i].offsetHeight + this.margin
      }
    }

    var options = {
      parentNode: document.querySelector('.list-wrap'),
      childrenNode: document.querySelectorAll('.list-item')
    }
    var newWaterfall = new Waterfall(options)
    newWaterfall.init()

    /**
     * 可视宽变化时，重算
     */
    var timer
    window.addEventListener('resize', function () {
      clearTimeout(timer)
      timer = setTimeout(function () {
        newWaterfall.init()
      }, 200)
    })
  }
}()