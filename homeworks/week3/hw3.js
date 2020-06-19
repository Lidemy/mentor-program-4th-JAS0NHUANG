// 第一次打錯一個字母……'readlint', 一直 Runtime Error
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

function solve (lines) {
  for (let i = 1; i < lines.length; i++) {
    // 要注意題目給的例子，1 不是質數。
    if (Number(lines[i]) === 1) {
      console.log('Composite')
    } else {
      console.log(isPrime(Number(lines[i])))
    }
  }

  function isPrime (n) {
    // 如果是 2 或 3 不會進入迴圈，直接輸出 'Prime'
    // 4 以上因為一定可以整除 1 跟自已，所以從 2 檢查到自已的前一個數字。
    // （其實只要檢查到自已除以 2 就可以了，但是速度好像沒有比較快……）
    for (let j = 2; j <= n / 2; j++) {
      if (n % j === 0) {
        return 'Composite'
      }
    }
    return 'Prime'
  }
}
