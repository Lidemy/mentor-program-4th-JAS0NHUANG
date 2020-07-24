const imgList = [...document.querySelectorAll('.carousel__img')]
let currentImg = 0
let leftImg = imgList.length - 1
let rightImg = 1
let moving = false

document.querySelector('.carousel').addEventListener('click', evt => {
  if (!moving) {
    moving = true
    setTimeout(() => { moving = false }, 500)

    const holder = currentImg
    if (evt.target.classList.contains('carousel__right')) {
      imgList[currentImg].className = 'carousel__img left'
      imgList[rightImg].className = 'carousel__img current'
      currentImg = rightImg
      leftImg = holder
      if (rightImg + 1 > imgList.length - 1) {
        rightImg = 0
      }
      rightImg += 1
      imgList[rightImg].className = 'carousel__img right'
      return
    }
    if (evt.target.classList.contains('carousel__left')) {
      imgList[currentImg].className = 'carousel__img right'
      imgList[leftImg].className = 'carousel__img current'
      currentImg = leftImg
      rightImg = holder
      if (leftImg - 1 < 0) {
        leftImg = imgList.length - 1
      }
      leftImg -= 1
      imgList[leftImg].className = 'carousel__img left'
    }
  }
})
