const readline = require('readline')

const lines = []

// 這個寫法我有一點問題，就是這個在 createInterface 方法裡面的 {} 算是傳入的參數嗎？
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
    // 數字最大會到 512 位數
    // 試試看不用 BigInt （1. 檢查位數多的大 2. 位數一樣的話，一位一位比大小，有時間可以寫寫看）
    const lineArray = lines[i].split(' ').map(BigInt)
    if (lineArray[0] === lineArray[1]) {
      console.log('DRAW')
    } else if (lineArray[2] > 0) {
      if (lineArray[0] > lineArray[1]) {
        console.log('A')
      } else {
        console.log('B')
      }
    } else {
      if (lineArray[0] < lineArray[1]) {
        console.log('A')
      } else {
        console.log('B')
      }
    }
  }
}
