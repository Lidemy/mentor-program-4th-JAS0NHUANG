// 看完 ALG101 Unit7  作業檢討：Project7 LIOJ 1008：幾個水桶 提到位元運算的應用
// 差不多就等於看到這一題的解答了！

function add (a, b) {
  if (a === 0 && b === 0) {
    console.log(0)
    return
  }
  if (isNaN(a) || isNaN(b) || a < 0 || b < 0) {
    console.log('請輸入兩個正整數')
    return
  }

  // 建立一個空陣列儲存運算過後每一位的數字
  const sumArray = []
  // 建立一個變數記錄進位狀態
  let carry = 0
  // 只要 a 或 b 其中一個沒有被除到 0 就繼續運算
  while (a !== 0 || b !== 0) {
    // 如果兩個二進位數字結尾都為 1
    if ((a & 1) === 1 && (b & 1) === 1) {
      // 判斷進位狀態是否為 0
      if (carry === 0) {
        // carry 是 0，1 + 1 + 0 = 10，將 0 存入陣列
        // 進位狀態存入 1（要進位）
        carry = 1
        sumArray.push(0)
      } else {
        // carry 是 1, 1 + 1 + 1 = 11，將 1 存入陣列
        // 進位狀態保持為 1（同樣要進位）
        sumArray.push(1)
      }
    } else if ((a & 1) === 0 && (b & 1) === 0) {
    // 如果兩個二進位數字結尾都為 0
      if (carry === 0) {
        // carry 是 0，0 + 0 + 0 = 0，陣列存入 0
        // 進位狀態保持為 0
        sumArray.push(0)
      } else {
        // carry 是 1，0 + 0 + 1 = 1，陣列存入 0
        // 進位狀態清空為 0（不必進位）
        carry = 0
        sumArray.push(1)
      }
    } else {
    // 如果兩者結尾一個為 1 一個為 0
      if (carry === 0) {
        // carry 為 0，陣列存入 1，不進位
        sumArray.push(1)
      } else {
        // carry 為 1，陣列存入 0，進位
        carry = 1
        sumArray.push(0)
      }
    }
    // 利用位元運算除以二（等於拿掉 2 進位數字的最後一位）
    a = a >> 1
    b = b >> 1
  }
  // 運算結束後還要再確認進位狀態是否為 0
  // 不是 0 的話要再把它加入陣列的最後一位。
  if (carry !== 0) {
    sumArray.push(carry)
  }
  // 因為存入陣列的順序是由左至右，所以先將陣列反轉 reverse，再 join
  // 得到一個二進位數字型態的字串
  const sumNumStr = sumArray.reverse().join('')
  // 用 parseInt 將二進位型態字串轉換為 10 進位數字。
  console.log(parseInt(sumNumStr, 2))
}

add(100, 1000)
add(1000, 1000)
add(77, 280)
add(1, 0)
add('aaa', 'bbb')
add(-3, 8)
add(0, 0)
