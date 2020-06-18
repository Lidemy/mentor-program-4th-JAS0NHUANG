// join
function join (arr, concatStr) {
  let returnStr = ''
  if (arr.length === 0) return ''
  for (let i = 0; i < arr.length - 1; i++) {
    returnStr = returnStr + arr[i] + concatStr
  }
  returnStr += arr[arr.length - 1]
  return returnStr
}

// repeat
function repeat (str, times) {
  let returnStr = ''
  for (let i = 0; i < times; i++) {
    returnStr += str
  }
  return returnStr
}

module.exports = {
  join: join,
  repeat: repeat
}
// 測資放在 week2.test.js
