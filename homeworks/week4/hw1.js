const apiURL = 'https://lidemy-book-store.herokuapp.com'
const axios = require('axios')

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

const request = require('request')
request.get(`${apiURL}/books?_limit=10`, (error, res, body) => {
  if (error) {
    console.log(error)
    return
  }
  let data
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
