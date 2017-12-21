! function () {
  $(function () {

    /**
     * 新建一个轮播对象，所有方法基于 jQuery
     * @param {Object} options 
     *    {
     *      swiperNodes: 轮播的所有图片节点 jQ 对象（即将位移的对象）  ( 必填 )
     *      btnNodes: 轮播的按钮对象数组 jQ 对象   （ 必填 ）
     *      speed: 轮播速度，单位 ms 。默认 500
     *      currentIndex: 当前轮播图位置
     *      activeClass: 激活的样式，默认 active
     *      auto: 是否开启自动轮播， Boolean 类型， 默认 false
     *      interval: 自动轮播间隔，单位 ms ，默认 2000 。
     *    }
     */
    function _swiper(options) {
      this.swiperNodes = options.swiperNodes
      this.btnNodes = options.btnNodes
      this.speed = options.speed || 500
      this.currentIndex = options.currentIndex || 0
      this.activeClass = options.activeClass || 'active'
      this.auto = options.auto || false
      this.interval = options.interval || 2000
      this.start = 0
      this.end = this.swiperNodes.length - 1
      this.preIndex = this.end
    }

    /**
     * 初始化，激活轮播
     */
    _swiper.prototype.init = function () {
      this.currentMode(this.currentIndex)
      this._judgeAuto()
    }

    /**
     * 计算模式，用于左右位移
     * @param {Number} offset { -1 / 1  => 控制轮播位移方向}
     */
    _swiper.prototype.calculateMode = function (offset) {
      this._optimizedAutoMode()
      this.preIndex = this.currentIndex
      this.currentIndex += offset
      if (this.currentIndex < 0) {
        this.preIndex = 0
        this.currentIndex = this.end
      } else if (this.currentIndex > this.end) {
        this.currentIndex = this.start
        this.preIndex = this.end
      }
      this._move()
      this._judgeAuto()
    }

    /**
     * 按钮模式，根据按钮的索引位移图片
     * @param {Number} index {按钮的索引}
     */
    _swiper.prototype.currentMode = function (index) {
      this._optimizedAutoMode()
      this.preIndex = this.currentIndex
      this.currentIndex = index
      this._move()
      this._judgeAuto()
    }

    /**
     * 判断自动模式是否开启
     */
    _swiper.prototype._judgeAuto = function () {
      if (this.auto) {
        this._autoMode()
      }
    }

    /**
     * 自动模式函数，定时器模拟点击
     */
    _swiper.prototype._autoMode = function () {
      var self = this
      clearInterval(self.timer)
      self.timer = setInterval(function () {
        self.calculateMode(1)
      }, self.interval)
    }

    /**
     * 优化自动模式体验，手动时先清除自动模式
     */
    _swiper.prototype._optimizedAutoMode = function () {
      clearInterval(this.timer)
    }

    /**
     * 轮播对象的移动函数
     */
    _swiper.prototype._move = function () {
      this.swiperNodes.stop()

      $(this.swiperNodes[this.preIndex]).animate({
        opacity: 0,
      }, this.speed)

      $(this.swiperNodes[this.currentIndex]).animate({
        opacity: 1,
      }, this.speed, this._animateCallBack.call(this))

    }

    /**
     * 轮播动画的回调函数，用于同步按钮显示
     */
    _swiper.prototype._animateCallBack = function () {
      this.btnNodes.removeClass(this.activeClass)
      $(this.btnNodes[this.currentIndex]).addClass(this.activeClass)
    }

    var $leftBtn = $('.swiper-left')
    var $rightBtn = $('.swiper-right')
    var $btns = $('.swiper-btns')

    var options = {
      swiperNodes: $('.swiper-item'),
      btnNodes: $('.swiper-btn'),
      auto: true
    }
    var newSwiper = new _swiper(options)
    newSwiper.init()

    $leftBtn.on('click', function () {
      newSwiper.calculateMode(-1)
    })

    $rightBtn.on('click', function () {
      newSwiper.calculateMode(1)
    })

    $btns.on('click', '.swiper-btn', function () {
      newSwiper.currentMode($(this).index())
    })
  })
}()