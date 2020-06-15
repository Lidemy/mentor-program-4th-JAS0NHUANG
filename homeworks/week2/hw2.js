// for 迴圈與 char code 轉換
function capitalize (str) {
  let capStr = ''
  for (let i = 0; i < str.length; i++) {
    if (i === 0 && str.charCodeAt(0) <= 122 && str.charCodeAt(0) >= 97) {
      capStr += String.fromCharCode(str.charCodeAt(0) - 32)
    } else {
      capStr += str[i]
    }
  }
  return capStr
}

console.log(capitalize('nick'))

// replace + toUpperCase
function capitalizeAdv (str) {
  return str.replace(/^./, str[0].toUpperCase())
}

console.log(capitalizeAdv('Nick'))

// arrow function
const capitalizeArrow = (str) => str.replace(/^./, str[0].toUpperCase())

console.log(capitalizeArrow(',hello'))
console.log(capitalizeArrow('just another test!'))
