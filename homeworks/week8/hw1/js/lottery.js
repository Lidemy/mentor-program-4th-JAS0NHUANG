const API_URL = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const errMessage = '系統不穩定，請再試一次'
const errParsing = '資料錯誤，請再試一次'

// Call API
function getPrize(cb) {
  const request = new XMLHttpRequest()
  request.open('GET', API_URL, true)
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data
      try {
        data = JSON.parse(request.response)
      } catch (err) {
        cb(errParsing)
        return
      }
      if (!data.prize) {
        cb(errMessage)
        return
      }
      cb(null, data)
    } else {
      cb(errMessage)
    }
  }
  request.onerror = function() {
    cb(errMessage)
  }
  request.send()
}

// 顯示結果
function displayLotteryResult(image, message) {
  document.querySelector('.lottery__main').classList = `lottery__main lottery__${image}`
  document.querySelector('.lottery__form').classList = 'lottery__form wide'
  document.querySelector('.lottery__info').classList.add('lottery__prize')
  document.querySelector('.lottery__info').innerHTML = message
}

// 點擊按鈕
document.querySelector('.lottery__submit').addEventListener('click', evt => {
  getPrize((err, data) => {
    if (err) {
      alert(err)
      return
    }
    console.log(data.prize)
    switch (data.prize) {
      case 'FIRST':
        displayLotteryResult('firstImg', '恭喜你中頭獎了！日本東京來回雙人遊！')
        break
      case 'SECOND':
        displayLotteryResult('secondImg', '二獎！90 吋電視一台！')
        break
      case 'THIRD':
        displayLotteryResult('thirdImg', '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！')
        break
      case 'NONE':
        displayLotteryResult('mainImg', '銘謝惠顧')
        break
    }
  })
  evt.preventDefault()
})
