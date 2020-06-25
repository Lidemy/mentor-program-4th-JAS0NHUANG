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
    // 這個判斷應該移到函式裡
    // if (Number(lines[i]) === 1) {
    //  console.log('Composite')
    // } else {
    // 通常 isXXX 會回傳 boolean 值
    //  console.log(isPrime(Number(lines[i])))
    // }
    // 所以應該寫成：
    if (isPrime(Number(lines[i]))) {
      console.log('Prime')
    } else {
      console.log('Composite')
    }
  }

  function isPrime (n) {
    if (n === 1) return false
    // 如果是 2 或 3 不會進入迴圈，直接輸出 'Prime'
    // 4 以上因為一定可以整除 1 跟自已，所以從 2 檢查到自已的前一個數字。
    // （其實只要檢查到自已除以 2 就可以了，但是速度好像沒有比較快……）
    // 然後，依據數學證明好像只要檢查到該數字自已的開根號就好了
    for (let j = 2; j <= n / 2; j++) {
      if (n % j === 0) {
        return false
      }
    }
    return true
  }
}
