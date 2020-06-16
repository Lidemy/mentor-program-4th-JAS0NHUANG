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

// join 測試
console.log(join(['a'], '!'))
console.log(join([1, 2, 3], ''))
console.log(join(['a', 'b', 'c'], '!'))
console.log(join(['a', 1, 'b', 2, 'c', 3], ','))
console.log(join(['aaa', 'bb', 'c', 'dddd'], ',,'))
console.log(join([], '!!'))

// repeat 測試
console.log(repeat('a', 5))
console.log(repeat('yoyo', 2))
console.log(repeat('', 100))
