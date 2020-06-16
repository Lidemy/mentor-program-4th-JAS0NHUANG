// 老師的寫法
function teacherPrintPyramide (n) {
  for (let i = 1; i <= n; i++) { // 依傳入數字決定圈數/層數
    printLayer(i, n) // 印出的東西跟 目前層數與總層數相關，所以傳入這兩個參數
  }

  function printLayer (i, n) { // 實作印出第 i 層之函式
    const str = repeat(' ', n - i) + repeat('*', 2 * i - 1) // 將空白與星星用 repeat 處理過後之結果相加
    console.log(str) // 印出第 i 層
  }

  function repeat (str, n) {
    let output = ''
    for (let i = 0; i < n; i++) {
      output += str
    }
    return output
  }
}

teacherPrintPyramide(5)

// 下面是我的爛寫法
function printPyramide (n) {
  const midStar = '*'
  const addSpace = ' '
  if (n === 1) {
    console.log(midStar)
    return
  }

  function printStars (n) {
    for (let i = 0; i < n; i++) {
      let printOut = ''
      const m = n - i
      if (i === 0) {
        printOut = printSpace(m) + midStar
      } else {
        printOut = printSpace(m) + midStar
        for (let j = 0; j < i; j++) {
          printOut += '**'
        }
      }
      console.log(printOut)
    }
  }

  function printSpace (m) {
    let spaces = ''
    for (let i = m; i > 0; i--) {
      if (i !== 1) {
        spaces += addSpace
      }
    }
    return spaces
  }

  printStars(n)
}

printPyramide(10)
