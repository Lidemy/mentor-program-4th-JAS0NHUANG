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

// 簡單用雙層迴圈印出星星。
function solve (lines) {
  for (let i = 1; i <= Number(lines[0]); i++) {
    let starsStr = ''
    for (let j = 1; j <= i; j++) {
      starsStr += '*'
    }
    console.log(starsStr)
  }
}

// 用內建函式 repeat 解：
// function solve(lines) {
//   let n = Number(lines[0])
//   for (let i = 0; i <= n; i++) {
//     console.log('*'.repeat(i))
//   }
// }
