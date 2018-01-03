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
function getNews(res) {
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
const newWaterfall = new Waterfall(options)

const container = document.querySelector('.container')

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
}

let page = 1
JSONP({
  fncName: 'getNews',
  num: 10,
  page: page
})

let timer
const bottom = document.querySelector('#bottom')
window.addEventListener('scroll', function () {
  clearTimeout(timer)
  timer = setTimeout(() => {
    if (isVisible(bottom)) {
      console.log(true)
      JSONP({
        fncName: 'getNews',
        num: 10,
        page: ++page
      })
    }
  }, 200)
})