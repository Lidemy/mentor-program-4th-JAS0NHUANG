const apiURL = 'https://restcountries.eu/rest/v2'

const axios = require('axios')

axios
  .get(`${apiURL}/name/${process.argv[2]}`)
  .then(res => {
    for (const i in res.data) {
      console.log('============')
      console.log(`國家: ${res.data[i].name}`)
      console.log(`首都: ${res.data[i].capital}`)
      console.log(`貨幣: ${res.data[i].currencies[0].code}`)
      console.log(`國碼: ${res.data[i].callingCodes}`)
    }
    console.log('axios 輸出結束\n')
  })
  .catch(err => {
    if (!process.argv[2]) {
      console.log('請輸入要查詢的國家名稱')
    } else if (err.response.data.status === 404) {
      console.log('找不到國家資訊')
    } else {
      console.log('查詢失敗')
    }
    console.log('axios 錯誤訊息\n')
    return err
  })

const request = require('request')

request.get(`${apiURL}/name/${process.argv[2]}`, (error, response, body) => {
  if (!process.argv[2]) {
    console.log('請輸入要查詢的國家名稱')
    console.log('request 錯誤訊息\n')
    return
  }
  if (error) {
    console.log('查詢失敗')
    console.log('request 錯誤訊息\n')
    return
  }
  let data
  try {
    data = JSON.parse(body)
  } catch (error) {
    console.log('查詢失敗')
    console.log('request 錯誤訊息\n')
    return
  }
  if (response.statusCode === 404) {
    console.log('找不到國家資訊')
    console.log('request 錯誤訊息\n')
    return
  }
  for (const i in data) {
    console.log('============')
    console.log(`國家: ${data[i].name}`)
    console.log(`首都: ${data[i].capital}`)
    console.log(`貨幣: ${data[i].currencies[0].code}`)
    console.log(`國碼: ${data[i].callingCodes}`)
  }
  console.log('request 輸出結束\n')
})
