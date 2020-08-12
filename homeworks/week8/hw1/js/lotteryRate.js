const API_URL = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'

let first = 0
let second = 0
let third = 0
let none = 0
let error = 0

let total = 0
const request = new XMLHttpRequest()

request.onload = function () {
  let json
  try {
    json = JSON.parse(request.response)
  } catch (err) {
    error++
    console.log(err)
  }
  switch (json.prize) {
    case 'FIRST':
      first++
      break
    case 'SECOND':
      second++
      break
    case 'THIRD':
      third++
      break
    case 'NONE':
      none++
      break
    default:
      error++
  }
  console.log(first, second, third, none, error)
  total = first + second + third + none + error

  console.log(total)
}

setInterval(function getData() {
  request.open('GET', API_URL, true)
  request.send()
}, 200)

document.querySelector('.lottery__submit').addEventListener('click', evt => {
  evt.preventDefault()
})
