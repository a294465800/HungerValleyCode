window.onload = function () {
    let boardList = document.querySelector('#boardList')
    let content = document.querySelector('.content')
    boardList.addEventListener('click', function (e) {
        let target = e.target
        let lists = boardList.querySelectorAll('li')

        if (target.tagName.toLowerCase() === 'li') {
            lists.forEach((item, index) => {
                if (e.target === item) {
                    target.classList.add('active')
                    content.innerText = '内容' + (index + 1)
                } else {
                    item.classList.remove('active')
                }
            })
        }
    })
}