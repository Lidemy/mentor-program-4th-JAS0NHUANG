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
// 使用內建函式 replace 與 toUpperCase
function capitalizeAdv (str) {
  return str.replace(/^./, str[0].toUpperCase())
}

// 改寫為 ES6 arrow function
const capitalizeArrow = (str) => str.replace(/^./, str[0].toUpperCase())

module.exports = {
  capitalize: capitalize,
  capitalizeAdv: capitalizeAdv,
  capitalizeArrow: capitalizeArrow
}
