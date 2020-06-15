function join (arr, concatStr) {
  let returnStr = ''
  if (arr.length === 0) return ''
  for (let i = 0; i < arr.length - 1; i++) {
    returnStr = returnStr + arr[i] + concatStr
  }
  returnStr += arr[arr.length - 1]
  return returnStr
}

function repeat (str, times) {
  let returnStr = ''
  for (let i = 0; i < times; i++) {
    returnStr += str
  }
  return returnStr
}

console.log(join(['a'], '!'))
console.log(join([1, 2, 3], ''))
console.log(join(['a', 'b', 'c'], '!'))
console.log(join(['a', 1, 'b', 2, 'c', 3], ','))
console.log(join(['aaa', 'bb', 'c', 'dddd'], ',,'))
console.log(join([], '!!'))

console.log(repeat('a', 5))
console.log(repeat('yoyo', 2))
