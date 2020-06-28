const http = require('http')
const querystring = require('querystring')

const apiURL = 'lidemy-book-store.herokuapp.com'
const action = process.argv[2]
const requestData = process.argv[3]

let reqMethod
let reqPath
let qData

if (action === 'delete') {
  reqMethod = 'DELETE'
} else if (action === 'create') {
  reqMethod = 'POST'
  reqPath = '/books'
  qData = querystring.stringify({
    name: process.argv[3]
  })
} else {
  reqMethod = 'PATCH'
  reqPath = `/books/${requestData}`
  qData = querystring.stringify({
    name: process.argv[4]
  })
}

const options = {
  hostname: apiURL,
  port: 80,
  path: reqPath,
  method: reqMethod,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const data = qData

switch (action) {
  case 'list':
    listBooks()
    break
  case 'read':
    readBook(requestData)
    break
  //  case 'delete':
  //    deleteBook(param)
  //    break
  case 'create':
    createBook(data)
    break
  case 'update':
    createBook(data)
    break
  default:
    console.log('可用功能：list、read、delete、create 與 update')
}

function listBooks () {
  http.get(`http://${apiURL}/books?_limit=20`, res => {
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
        console.log(`${data[i].id}. ${data[i].name}`)
      }
    })
  })
}

function readBook (param) {
  http.get(`http://${apiURL}/books/${param}`, res => {
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
      console.log(`${data.id}. ${data.name}`)
    })
  })
}

// function deleteBook (param) {
//   http.delete(`${apiURL}/books/${param}`)
//     res => {
//       console.log(`已刪除 ID 為 ${param} 的書輯。`)
//     }).catch(err => {
//       console.log('沒有這本書耶！')
//       return err
//     })
// }

function createBook (data) {
  const req = http
    .request(options, res => {
      let data = ''
      console.log(res.statusCode)
      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => {
        console.log('Body:', data)
      })
    })
    .on('error', err => {
      console.log(err)
    })

  req.write(data)
  req.end()
}

// function createBook (param) {
//   if (param !== undefined) {
//     http.post(`${apiURL}/books`, {
//       name: param
//     }
//     )res => {
//       console.log(`已新增書名為 ${process.argv[3]} 的書輯。`)
//     }).catch(err => {
//       console.log('輸入錯誤')
//       return err
//     })
//   } else {
//     console.log('請輸入想新增的書名')
//   }
// }

// function updateBook (param, bookName) {
//   http.patch(`${apiURL}/books/${param}`, {
//     name: bookName
//   }
//   )res => {
//     console.log(`已將 ID 為 ${param} 的書輯改名為 ${bookName} 。`)
//   }).catch(err => {
//     console.log('沒有這本書耶！')
//     return err
//   })
// }
