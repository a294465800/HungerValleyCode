window.onload = function () {
  var btn = document.querySelector('#more')
  btn.addEventListener('click', function (event) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', '/HungerValleyCode/advance/task12/01/category.json', true)
    xhr.send()
    xhr.addEventListener('load', function (res) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        var data = JSON.parse(xhr.response)
        var ul = document.querySelector('#contentList')
        data.data.forEach(element => {
          var li = document.createElement('li')
          li.innerHTML = element.name
          li.classList.add('content-item')
          ul.appendChild(li)
        });
      } else {
        alert('服务器出错啦')
      }
    })
  })
}