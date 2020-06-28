// axios 做法
const axios = require('axios')

const apiURL = 'https://lidemy-book-store.herokuapp.com'
const action = process.argv[2]
// requestData => param
const param = process.argv[3]
const bookName = process.argv[4]

// 本來是用 if (action === XXX)
// 看過範例後真的是用 switch 比較好
switch (action) {
  case 'list':
    listBooks()
    break
  case 'read':
    readBook(param)
    break
  case 'delete':
    deleteBook(param)
    break
  case 'create':
    createBook(param)
    break
  case 'update':
    updateBook(param, bookName)
    break
  default:
    console.log('可用功能：list、read、delete、create 與 update')
}

function listBooks () {
  axios.get(`${apiURL}/books?_limit=20`)
    .then(res => {
      for (const i in res.data) {
        console.log(`${res.data[i].id}. ${res.data[i].name}`)
      }
    }).catch(err => {
      console.log(err)
    })
}

function readBook (param) {
  axios.get(`${apiURL}/books/${param}`)
    .then(res => {
      console.log(`${res.data.id}. ${res.data.name}`)
    }).catch(err => {
      console.log('沒有這本書耶！')
      return err
    })
}

function deleteBook (param) {
  axios.delete(`${apiURL}/books/${param}`)
    .then(res => {
      console.log(`已刪除 ID 為 ${param} 的書輯。`)
    }).catch(err => {
      console.log('沒有這本書耶！')
      return err
    })
}

function createBook (param) {
  if (param !== undefined) {
    axios.post(`${apiURL}/books`, {
      name: param
    }
    ).then(res => {
      console.log(`已新增書名為 ${process.argv[3]} 的書輯。`)
    }).catch(err => {
      console.log('輸入錯誤')
      return err
    })
  } else {
    console.log('請輸入想新增的書名')
  }
}

function updateBook (param, bookName) {
  axios.patch(`${apiURL}/books/${param}`, {
    name: bookName
  }
  ).then(res => {
    console.log(`已將 ID 為 ${param} 的書輯改名為 ${bookName} 。`)
  }).catch(err => {
    console.log('沒有這本書耶！')
    return err
  })
}
