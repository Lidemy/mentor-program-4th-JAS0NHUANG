// 不能用 reverse 函式
function reverse (str) {
  let reversedStr = ''
  for (let i = str.length - 1; i >= 0; i--) {
    reversedStr += str[i]
  }
  console.log(reversedStr)
}

reverse('hello')
reverse('yoyoyo')
reverse('1abc2')
reverse('1,2,3,2,1')
