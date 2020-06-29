const apiURL = 'https://lidemy-book-store.herokuapp.com'

const https = require('https')

https.get(`${apiURL}/books?_limit=10`, res => {
  res.on('error', err => {
    console.log(err)
  })
  res.on('data', d => {
    let data
    try {
      data = JSON.parse(d)
    } catch (error) {
      console.log(error)
      return
    }
    for (const i in data) {
      process.stdout.write(`${data[i].id} ${data[i].name} \n`)
    }
  })
})
