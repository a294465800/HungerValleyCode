! function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? (module.exports = factory()) :
    typeof define === 'function' && define.amd ? define(factory) : (global.Swiper = factory())
}(this, function () {

  function Waterfall(options) {
    this.parentNode = options.parentNode
    this.unit = 'px'
    this.margin = 10

    this.parentWidth = parseFloat(getComputedStyle(this.parentNode).width)
    this.childWidth = 300 + this.margin
    this.colNum = Math.floor(this.parentWidth / this.childWidth)
    this.offset = []
    for (var i = 0; i < this.colNum; i++) {
      this.offset.push(0)
    }
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
  Waterfall.prototype.place = function (node) {
    this.calculateTop()
    node.style.top = this.minTop + this.unit
    node.style.left = this.childWidth * this.minIndex + this.unit
    this.offset[this.minIndex] = this.minTop + node.offsetHeight + this.margin * 2
  }

  return Waterfall
})