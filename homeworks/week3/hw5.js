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

// 不用 BigInt 的解法：
// const readline = require('readline')

// const lines = []

// const rl = readline.createInterface({
//   input: process.stdin
// })

// rl.on('line', function (line) {
//   lines.push(line)
// })

// rl.on('close', function () {
//   solve(lines)
// })

// function solve (lines) {
//   for (let i = 1; i < lines.length; i++) {
//     const lineArray = lines[i].split(' ')
//     const numA = lineArray[0]
//     const numB = lineArray[1]
//     // 相等則為 DRAW
//     if (numA === numB) {
//       console.log('DRAW')
//     } else if (Number(lineArray[2])> 0) {
//       // 呼叫 checkAB 函式比大小
//       if (checkAB(numA, numB)) {
//         console.log('A')
//       } else {
//         console.log('B')
//       }
//     } else {
//       if (!(checkAB(numA, numB))) {
//         console.log('A')
//       } else {
//         console.log('B')
//       }
//     }
//   }
// }

// // 建立一個函式以字串的方式比較 A 與 B 兩個數字的大小
// function checkAB(A, B) {
//   // 比長度
//   if (A.length > B.length) {
//     return true
//   } else if (A.length < B.length) {
//     return false
//   // 如果長度相同
//   }else {
//     // 從最高位數（字串的第 0 個字符）比較大小
//     // 只要找到一個比較大就一定是較大的數字
//     for(let i = 0; i < A.length; i++) {
//       if (A[i] > B[i]) {
//         return true
//       } else if(A[i] < B[i]) {
//         return false
//       }
//     }
//   }
// }
