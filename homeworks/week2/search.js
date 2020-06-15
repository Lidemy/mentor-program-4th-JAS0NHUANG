function search (arr, n) {
  let rangeX = 0
  let rangeY = Math.floor(arr.length / 2)
  let rangeZ = arr.length - 1
  while (rangeY - rangeX !== 0) {
    if (n === arr[rangeX]) return rangeX
    if (n === arr[rangeY]) return rangeY
    if (n === arr[rangeZ]) return rangeZ
    if (n < arr[rangeY]) {
      rangeZ = rangeY
      rangeY = Math.floor(rangeY / 2)
    }
    if (n > arr[rangeY]) {
      rangeX = rangeY
      rangeY = rangeY + Math.floor((rangeZ - rangeY) / 2)
    }
  }
  return '-1'
}

console.log(search([1, 3, 10, 14, 39], 14))
console.log(search([1, 3, 10, 14, 39], 299))
console.log('其它測試……')

console.log(search([1, 2, 3], 2))
console.log(search([1, 2, 3, 4, 5, 6, 7, 8], 9))
console.log(search([1, 2, 3, 4, 5, 6, 7, 8], 8))
console.log(search([1, 2, 3, 4, 5, 6, 7, 8], 6))
console.log(search([1, 2, 3, 4, 5, 6, 7, 8, 9], 3))
console.log(search([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 22))
console.log(search([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3))
console.log(search([1, 2, 3, 4, 5, 6, 7, 8, 99, 100], 99))
