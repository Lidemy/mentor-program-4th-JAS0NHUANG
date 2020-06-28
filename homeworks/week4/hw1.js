const apiURL = 'https://lidemy-book-store.herokuapp.com'
// 用 Axios
const axios = require('axios')

// 還沒有去查 axios 如果遇到 data 不是 JSON 格式的資料時應該如何處理。
axios
  .get(`${apiURL}/books?_limit=10`)
  .then(res => {
    console.log('--------Axios 輸出--------')
    for (const i in res.data) {
      console.log(`${res.data[i].id} ${res.data[i].name}`)
    }
    console.log('--------Axios 輸出結束--------\n')
  })
  .catch(err => {
    console.log(err)
  })

// 用老師示範的 request
const request = require('request')

// request.get(`${apiURL}/books?_limit=10`, (error, res, body) => {
//   const books = JSON.parse(body)
//   console.log('--------request 輸出--------')
//   for (const i in books) {
//     console.log(`${books[i].id} ${books[i].name}`)
//   }
//   if (error) {
//     console.log(error)
//     return
//   }
//   console.log('--------request 輸出結束--------\n')
// })

// 看過自我檢討後重新寫：
request.get(`${apiURL}/books?_limit=10`, (error, res, body) => {
  // 把錯誤處理放到前面
  if (error) {
    console.log(error)
    return
  }

  let data
  // try catch JSON.parse 避免讀入的資料有誤
  try {
    data = JSON.parse(body)
  } catch (error) {
    console.log(error)
    return
  }
  console.log('--------request 輸出--------')
  for (const i in data) {
    console.log(`${data[i].id} ${data[i].name}`)
  }
  console.log('--------request 輸出結束--------\n')
})
