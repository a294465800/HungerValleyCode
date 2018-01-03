requirejs(["swiper", "waterfall"], function (Swiper, Waterfall) {
  var newSwiper = new Swiper({
    parentNode: '#header',
    auto: true,
    imageData: [{
        url: 'http://imgs12.iaweg.com/pic/HTTP2ltZzEuM2xpYW4uY29tL2ltZzAxMy92NC80Mi9kLzQxLmpwZwloglog.jpg',
      },
      {
        url: 'http://imgs23.iaweg.com/pic/HTTP3BwdC5kb3duaG90LmNvbS9kL2ZpbGUvcC8yMDE0LzAzLzE0L2Y3YTNhZTUyY2U0YTZmOWE5Mzg4YWY4ZTQ5OGZjYWJlLmpwZwloglog.jpg',
      },
      {
        url: 'http://imgs9.iaweg.com/pic/HTTP3R1cGlhbi5lbnRlcmRlc2suY29tLzIwMTMvbXh5LzEwLzE0LzEvNy5qcGclog.jpg',
      },
    ]
  })








  //元素是否在可视区
  function isVisible(node) {
    var currentTop = window.pageYOffset
    var currentHeight = window.innerHeight
    var nodeTop = node.offsetTop
    if (nodeTop < currentTop + currentHeight + 300 && nodeTop > currentTop) {
      return true
    }
    return false
  }

  var more = document.querySelector('#more')

  /**
   * jsonp
   * @param {Object} options {page,num,fncName}
   */
  function JSONP(options) {
    const body = document.querySelector('body')
    const scriptNode = body.querySelector('#jsonp')
    if (scriptNode) {
      body.removeChild(scriptNode)
    }
    const newScriptNode = document.createElement('script')
    newScriptNode.src = `https://platform.sina.com.cn/slide/album_tech?app_key=1271687855&num=${options.num || 10}&page=${options.page || 1}&jsoncallback=${options.fncName}`
    newScriptNode.id = 'jsonp'

    body.appendChild(newScriptNode)
  }


  //接受新闻内容
  window.getNews = function (res) {
    appendLi(res.data)
  }


  let ul = document.querySelector('.list-wrap')

  //创建 li
  function crateLi(data) {
    let li = document.createElement('li')
    li.classList.add('list-item')
    li.innerHTML = `
  <a class="list-link" target="_blank" href="${data.url}">
  <img class="list-img" src="${data.img_url}" alt="图片">
  </a>
  <h3 class="list-title">${data.short_name}</h3>
  <p class="list-intro">${data.short_intro}</p>`
    li.style.opacity = 0
    ul.appendChild(li)
    return li
  }


  var options = {
    parentNode: ul
  }
  var newWaterfall = new Waterfall(options)

  var container = document.querySelector('.container')

  //拼接 li
  function appendLi(data) {
    let liTmps = ''
    for (let i in data) {
      let newLi = crateLi(data[i])
      newLi.querySelector('img').addEventListener('load', function () {
        newWaterfall.place(newLi)
        newLi.style.opacity = 1
        container.style.height = Math.max.apply(null, newWaterfall.offset) + 'px'
      })
    }
    more.innerHTML = '加载更多'
    more.style.opacity = 1
  }

  let page = 1
  JSONP({
    fncName: 'getNews',
    num: 10,
    page: page
  })

  let timer
  more.addEventListener('click', function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      more.innerHTML = '加载中··'
      more.style.opacity = 0.6
      if (isVisible(more)) {
        JSONP({
          fncName: 'getNews',
          num: 10,
          page: ++page
        })
      }
    }, 200)
  })

  var timer2
  var toTop = document.querySelector('#back-top')
  window.addEventListener('scroll', function () {
    clearTimeout(timer2)
    timer2 = setTimeout(function () {
      if (window.pageYOffset > window.innerHeight) {
        toTop.classList.add('active')
      } else {
        toTop.classList.remove('active')
      }
    }, 200)
  })
})