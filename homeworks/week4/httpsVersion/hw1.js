const apiURL = 'https://lidemy-book-store.herokuapp.com'

// 用 node 內建的 https
const https = require('https')

https.get(`${apiURL}/books?_limit=10`, res => {
  res.on('error', err => {
    console.log(err)
  })
  res.on('data', d => {
    let data
    // 同樣加上 try catch
    try {
      data = JSON.parse(d)
    } catch (error) {
      console.log(error)
      return
    }
    console.log('--------內建 https 輸出--------')
    for (const i in data) {
      process.stdout.write(`${data[i].id} ${data[i].name} \n`)
    }
    console.log('--------https 輸出結束--------\n')
  })
})
