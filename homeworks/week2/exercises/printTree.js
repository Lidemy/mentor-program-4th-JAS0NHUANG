function printTree (n) {
  for (let i = 1; i <= n; i++) { // 依傳入數字決定圈數/層數
    printLayer(i, n) // 印出的東西跟 目前層數與總層數相關，所以傳入這兩個參數
  }
  // --------------------------加上印出樹幹的部分---------------------------------
  if (n !== 1) {
    for (let i = 0; i < n - 1; i++) {
      const str = repeat(' ', n - 1) + '|'
      console.log(str)
    }
  }
  // ----------------------------------------------------------------------------
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

printTree(5)
