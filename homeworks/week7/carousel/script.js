// 取得圖片陣列
const imgList = [...document.querySelectorAll('.carousel__img')]

// 設定初始圖片
let currentImg = 0
let leftImg = imgList.length - 1
let rightImg = 1

// 是否為移動中
let moving = false

// event listener
document.querySelector('.carousel').addEventListener('click', evt => {
  if (moving) return
  moving = true
  setTimeout(() => { moving = false }, 500)
  const direction = evt.target.classList.contains('carousel__left') ? 'left' : 'right'
  carousel(currentImg, direction)
})

// carousel function
function carousel(currentIndex, direction) {
  const opposite = direction === 'right' ? 'left' : 'right'
  const nextIndex = direction === 'right' ? rightImg : leftImg
  // 新增下面一行刪掉前一個圖片裡的 opposite class name
  document.querySelector(`.${opposite}`).classList.remove(opposite)
  imgList[currentIndex].className = `carousel__img ${opposite}`
  imgList[nextIndex].className = 'carousel__img current'
  currentImg = nextIndex

  if (direction === 'right') {
    rightImg = (rightImg + 1 > imgList.length - 1) ? 0 : rightImg + 1
    // 新增下面一行改變反方向 Img 的 Index
    leftImg = (leftImg + 1 > imgList.length - 1) ? 0 : leftImg + 1
    imgList[rightImg].className = 'carousel__img right'
  }

  if (direction === 'left') {
    leftImg = (leftImg - 1 < 0) ? imgList.length - 1 : leftImg - 1
    // 新增下面一行改變反方向 Img 的 Index
    rightImg = (rightImg - 1 < 0) ? imgList.length - 1 : rightImg - 1
    imgList[leftImg].className = 'carousel__img left'
  }
}
