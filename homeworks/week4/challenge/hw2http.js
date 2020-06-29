const http = require('http')

const apiURL = 'lidemy-book-store.herokuapp.com'
const action = process.argv[2]
const requestData = process.argv[3]

let reqMethod
let reqPath
let queryData

switch (action) {
  case 'list':
    reqMethod = 'GET'
    reqPath = '/books?_limit=20'
    break
  case 'read':
    reqMethod = 'GET'
    reqPath = `/books/${requestData}`
    break
  case 'create':
    reqMethod = 'POST'
    reqPath = '/books'
    queryData = `name=${requestData}`
    break
  case 'delete':
    reqMethod = 'DELETE'
    reqPath = `/books/${requestData}`
    break
  case 'update':
    reqMethod = 'PATCH'
    reqPath = `/books/${requestData}`
    queryData = `name=${process.argv[4]}`
    break
  default:
    console.log('可用指令：list、read、delete、create 與 update')
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

const req = http.request(options, res => {
  if (res.statusCode >= 400) {
    console.log('資料錯誤，請重新輸入')
    return
  }
  let data = ''
  res.on('data', chunk => {
    if (req.path === '/') {
      return
    }
    data = JSON.parse(chunk)

    switch (req.method) {
      case 'GET':
        if (data.length) {
          for (let i = 0; i < data.length; i++) {
            console.log(`${data[i].id}   ${data[i].name}`)
          }
        } else {
          console.log(`${data.id}   ${data.name}`)
        }
        break
      case 'POST':
        console.log(`新增書藉 ${data.name} id 為 ${data.id}`)
        break
      case 'DELETE':
        console.log(`已刪除 id 為 ${requestData} 的書藉`)
        break
      case 'PATCH':
        console.log(`已將 id 為 ${data.id} 之書藉更名為 ${data.name}`)
        break
    }
  })
})

req.on('error', e => {
  console.log('請重新輸入')
})

if (queryData !== undefined) {
  req.write(queryData)
}

req.end()
