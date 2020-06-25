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

// 一行解法, 連讀入資料都不用……
// console.log(lines[0].split('').reverse().join('') === lines[0] ? 'True' : 'False')

// 也算是沒有什麼難度，把字串反轉，與原字串比對，相等則為迴文

// 下面是我兩個月前第一次解的寫法，直接比對前半段與後半段每個字是否相同
// 結果一樣，在 LIOJ 上跑的結果看不出來效率上的差異
// 但是每圈會多做一個 strLeng/2 的計算，可能資料量多的時候就會有差了。
// var readline = require('readline');

// var lines = []
// var rl = readline.createInterface({
//   input: process.stdin
// });

// rl.on('line', function (line) {
//   lines.push(line)
// });

// rl.on('close', function() {
//   solve(lines)
// })

// function solve(lines){
//   let str = lines[0]
//   let strLeng = lines[0].length
//   for (i=0; i< Math.floor(strLeng/2); i++){
//     if (str[i] != str[strLeng-1-i]){
//       console.log("False")
//       return
//     }
//   }
//   console.log("True")
// }
