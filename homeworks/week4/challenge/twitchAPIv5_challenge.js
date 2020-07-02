// 引入套件
const request = require('request')

// 變數宣告
const API_URL = 'https://api.twitch.tv/kraken'
const clientID = '4ayslhgvt6l0te2bxcswxidd3ny3hb'
const options = {
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': clientID
  }
}

const totalStreams = 200
const queryURL = `${API_URL}/streams/?game=${process.argv[2]}`
const offset = 0

// 主要函式
function printStreams(queryURL, offset) {
  if (process.argv[2] === undefined) {
    console.log('請輸入一個遊戲名稱')
    return
  }
  // 串接 API
  request(queryURL, options, (err, res, body) => {
    let streams
    try {
      streams = JSON.parse(body).streams
    } catch (error) {
      console.log(error)
    }
    if (streams.length === 0) {
      if (offset === 0) {
        console.log('遊戲名稱錯誤或目前沒有此遊戲的直播')
      } else {
        console.log('已列出所有的直播')
      }
      return
    }
    if (err) {
      console.log(err)
      return
    }
    // 印出資料
    for (const i in streams) {
      const streamID = streams[i].channel._id
      let stream = JSON.stringify(streams[i].channel.status)
      // 字串資料處理
      if (stream.length > 70) {
        stream = stream.slice(1, 70) + '......'
      } else {
        stream = stream.slice(1, stream.length - 1)
      }
      const seperator = ' '.repeat(15 - streamID.toString().length)
      if (offset % 25 === 0) {
        console.log(
          '----實況ID----   ----實況名稱----------------------------------',
          `（第 ${offset + 1} 到 ${offset + streams.length}）`
        )
      }
      console.log(`${streamID} ${seperator} ${stream}`)
      offset += 1
    }
    // 如果還沒抓到設定的資料量，重新呼叫自已（printStreams()）
    if (offset < totalStreams) {
      queryURL += `&offset=${offset}`
      printStreams(queryURL, offset)
    }
  })
}

// 呼叫函式
printStreams(queryURL, offset)
