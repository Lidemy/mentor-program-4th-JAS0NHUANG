const readline = require('readline')

const lines = []

const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', function (line) {
  lines.push(line)
})

rl.on('close', function () {
  solve(lines)
})

// function solve (lines) {
//   // 想要試著用解構寫法，還不熟悉語法
//   const numArray = lines[0].split(' ').map(Number)
//   for (let i = numArray[0]; i <= numArray[1]; i++) {
//     if (isNarcissistic(i)) {
//       console.log(i)
//     }
//   }

//   function isNarcissistic (n) {
//     let sum = 0
//     // 第一次忘記用變數存 n 最後 n 都被變成 0
//     let number = n
//     // .toString() 第一次也沒有處理好
//     // 而且可能應該用除 10 的方式取幾位數才算有練習到：
//     // let pow = 0
//     // let powNum = n
//     // while (powNum / 10 !== 0) {
//     //   pow += 1
//     //   powNum = Math.floor(powNum / 10)
//     // }
//     const pow = number.toString(10).length
//     while (number / 10 > 0) {
//       sum += Math.pow(number % 10, pow)
//       number = Math.floor(number / 10)
//     }
//     if (sum === n) {
//       return true
//     }
//   }
// }

// 再練習一次：
function solve (lines) {
  const [firstNum, lastNum] = lines[0].split(' ').map(Number)
  for (let i = firstNum; i <= lastNum; i++) {
    if (isNarcissistic(i)) {
      console.log(i)
    }
  }
}

function getDigits (n) {
  // 設定 edge caase
  if (n === 0) return 1
  let digitCount = 0
  while (n !== 0) {
    n = Math.floor(n / 10)
    digitCount += 1
  }
  return digitCount
}

function isNarcissistic (n) {
  let number = n
  const pow = getDigits(number)
  let sum = 0
  while (number !== 0) {
    sum += Math.pow(number % 10, pow)
    number = Math.floor(number / 10)
  }
  // 記得回傳 boolean 值可以用比較的方法！
  return sum === n
}
