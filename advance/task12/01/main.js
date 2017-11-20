window.onload = function(){
  var xhr = new XMLHttpRequest()
  xhr.open('GET', '/category.json', true)
  xhr.send()
  xhr.onload = function(data){
    console.log(data)
  }
}