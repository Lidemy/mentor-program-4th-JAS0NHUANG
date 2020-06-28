const axios = require('axios')
const apiURL = 'https://api.twitch.tv/helix'
const oauth2URL = 'https://id.twitch.tv/oauth2/token'

// 下面 XXXX 與 YYYY 請分別填入 使用者 ID 與 密鑰
const [clientID, clientSecret] = [
  'XXXX',
  'YYYY'
]

let OAuthToken
let gameID

axios({
  method: 'post',
  url: `${oauth2URL}?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`
})
  .then(res => {
    OAuthToken = res.data.access_token
    getGameID(OAuthToken)
  })
  .catch(err => {
    console.log(err)
  })

// 取得 OAuth Token
function getGameID (OAuthToken) {
  if (OAuthToken === undefined) {
    console.log('無法取得 token')
    return
  }
  axios
    .get(`${apiURL}/games?name=${process.argv[2]}`, {
      headers: {
        'client-id': clientID,
        Authorization: `Bearer ${OAuthToken}`
      }
    })
    .then(res => {
      gameID = res.data.data[0].id
      printStreams(gameID)
    })
    .catch(err => {
      console.log(err)
    })
}

// 設定一個空的換頁物件
let pagination = {}
// 初始化已顯示的實況數
let streamers = 0
// 初始化 first 之參數
let n = 0
// 總共要顯示多少實況
const number = 200

function printStreams (gameID) {
  if (gameID === undefined) {
    console.log('Can not get the game ID')
    return
  }
  if (number - streamers >= 100) {
    n = 100
  } else {
    n = number - streamers
  }
  let getStreamersURL = `${apiURL}/streams?game_id=${gameID}&first=${n}`
  if (streamers !== 0) {
    getStreamersURL += `&after=${pagination.cursor}`
  }

  axios
    .get(getStreamersURL, {
      // headers: headers,
      headers: {
        Authorization: `Bearer ${OAuthToken}`,
        Accept: 'application/vnd.twitchtv.v5+json',
        'Client-ID': `${clientID}`,
        Client_Secret: `${clientSecret}`,
        Grant_Type: 'client_credentials'
      }
    })
    .then(res => {
      for (let i = 0; i < res.data.data.length; i++) {
        const channel = res.data.data[i]
        // 沒有 JSON.stringify 的話會有奇怪的空行出現
        let title = JSON.stringify(channel.title)
        // 處理輸出字串
        title = title.slice(title.indexOf('"') + 1, title.lastIndexOf('"'))
        if (title.length >= 45) {
          title = title.slice(0, 45) + ' ......'
        }
        // 對齊
        const seperator = ' '.repeat(15 - channel.id.length)

        console.log(`${channel.id} ${seperator} ${title}`)
        streamers += 1
      }
      pagination = res.data.pagination
      if (streamers < number) {
        printStreams(gameID)
      }
    })
    .catch(err => {
      console.log(err)
    })
}
