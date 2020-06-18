function search (arr, n) {
  // 之前將變數設為 rangeX rangeY, 感覺檢討寫成 L M R比較簡潔
  let L = 0
  let M = Math.floor(arr.length / 2)
  let R = arr.length - 1
  if (n === arr[L]) return L
  if (n === arr[R]) return R
  // 檢查中間是否碰到左右點。
  while (M !== L && M !== R) {
    if (n === arr[M]) return M
    if (n < arr[M]) {
      R = M
      M = Math.floor(M / 2)
    } else {
      L = M
      M = M + Math.floor((R - M) / 2)
    }
  }
  return '-1'
}

// 放上 LIOJ 可以 AC，但是寫的還是不太好看……

console.log(search([1, 3, 10, 14, 39], 14))
console.log(search([1, 3, 10, 14, 39], 299))
console.log('其它測試')
console.log(search([1, 2, 3], 2))
console.log(search([1, 2, 3, 4, 5, 6, 7, 8], 9))
console.log(search([1, 2, 3, 4, 5, 6, 7, 8], 8))
console.log(search([1, 2, 3, 4, 5, 6, 7, 8], 6))
console.log(search([3, 4, 5, 6, 7, 8, 9], 1))
console.log(search([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 22))
console.log(search([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3))
console.log(search([1, 2, 3, 4, 5, 6, 7, 8, 99, 100], 99))
console.log(search([1, 2], 1))
