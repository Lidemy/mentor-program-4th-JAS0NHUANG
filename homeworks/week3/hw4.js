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
  let reversedStr = ''
  for (let i = lines[0].length - 1; i >= 0; i--) {
    reversedStr += lines[0][i]
  }
  if (reversedStr === lines[0]) {
    console.log('True')
  } else {
    console.log('False')
  }
}

// 也算是沒有什麼難度，把字串反轉，與原字串比對，相等則為迴文
