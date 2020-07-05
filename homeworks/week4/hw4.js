// axios 與 request 可共用的內容
const apiURL = 'https://api.twitch.tv/kraken/'
const config = {
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': '4ayslhgvt6l0te2bxcswxidd3ny3hb'
  }
}

// axios 寫法
const axios = require('axios')

axios
  .get(`${apiURL}games/top`, config)
  .then(res => {
    for (let i = 0; i < res.data.top.length; i++) {
      console.log(`${res.data.top[i].viewers} ${res.data.top[i].game.name}`)
    }
    console.log('....')
    console.log('axios 輸出結束\n')
  })
  .catch(err => {
    console.log(err)
    return err
  })

// request 寫法
const request = require('request')

request.get(`${apiURL}games/top`, config, (error, response, body) => {
  if (error) {
    console.log(error)
    return
  }
  let data
  try {
    data = JSON.parse(body)
  } catch (error) {
    console.log('資料讀取失敗')
    return
  }
  for (let i = 0; i < data.top.length; i++) {
    console.log(`${data.top[i].viewers} ${data.top[i].game.name}`)
  }
  console.log('....')
  console.log('request 輸出結束\n')
})
