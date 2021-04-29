const http = require('http')

const API_ENDPOINT = 'lidemy-book-store.herokuapp.com'
const action = process.argv[2]
const argument1 = process.argv[3]
const argument2 = process.argv[4]

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
    reqPath = `/books/${argument1}`
    break
  case 'create':
    reqMethod = 'POST'
    reqPath = '/books'
    queryData = `name=${argument1}`
    break
  case 'delete':
    reqMethod = 'DELETE'
    reqPath = `/books/${argument1}`
    break
  case 'update':
    reqMethod = 'PATCH'
    reqPath = `/books/${argument1}`
    queryData = `name=${argument2}`
    break
  default:
    console.log('可用指令：list、read、delete、create、update。')
    return
}

const options = {
  hostname: API_ENDPOINT,
  port: 80,
  path: reqPath,
  method: reqMethod,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const req = http.request(options, res => {
  if (res.statusCode >= 400 || req.path === '/') {
    console.log('資料錯誤，請重新輸入。')
    return
  }
  let chunksString = ''
  // call when a data chunk is received. May have several chunks.
  res.on('data', chunk => {
    chunksString += chunk
  })
  res.on('end', () => {
    let data
    // process the chunks string here.
    try {
      data = JSON.parse(chunksString)
    } catch (error) {
      console.log(error, '資料解析失敗，請重試。')
    }
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

req.on('error', error => {
  console.log('請重新輸入')
})

if (queryData !== undefined) {
  req.write(queryData)
}

req.end()

// https://en.wikipedia.org/wiki/Chunked_transfer_encoding
