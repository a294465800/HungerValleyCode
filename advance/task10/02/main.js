window.onload = function () {
  let clickMe = document.querySelector('#clickMe')
  let alert = document.querySelector('#alert')
  let close = document.querySelector('.alert-close')
  let cancel = document.querySelector('#alertCancel')
  let confirm = document.querySelector('#alertConfirm')

  function closeAlert(e){
    alert.classList.remove('active')
  }

  clickMe.addEventListener('click', function(e){
    alert.classList.add('active')
  })
  alert.addEventListener('click', function(e){
    if(e.target.classList.contains('alert-shadow')){
      closeAlert()
    }
  })
  close.addEventListener('click', closeAlert)
  cancel.addEventListener('click', closeAlert)
  confirm.addEventListener('click', closeAlert)
}