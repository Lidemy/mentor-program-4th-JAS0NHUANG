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
  // 取得物品數、背包總承重
  const itemsCount = Number(lines[0].split(' ')[0])
  const maxWeight = Number(lines[0].split(' ')[1])
  // 如果物品數或背包承重為 0，直接回傳 0
  if (itemsCount === 0 || maxWeight === 0) {
    console.log(0)
    return
  }
  // 建立一個陣列將每個重量的值都預設為 0
  const weightValue = []
  for (let i = 0; i <= maxWeight; i++) {
    weightValue.push(0)
  }
  // console.log(weightValue)

  // 將物品重量與價值存入陣列
  const itemsWP = []
  for (let i = 1; i < lines.length; i++) {
    itemsWP.push(lines[i].split(' ').map(Number))
  }
  // console.log(itemsWP)
  // 遍歷每個物品
  for (let i = 0; i < itemsWP.length; i++) {
    // console.log(`i = ${i}`)
    // console.log(maxWeight)
    // 由前往後數會遇到自已本身被相加的問題
    // ex weightValue[5] + itemsWP[1][1] ( LIOJ 的範例測資）
    for (let j = maxWeight - itemsWP[i][0]; j >= 0; j--) {
      // console.log(j)
      if (weightValue[j] + itemsWP[i][1] > weightValue[j + itemsWP[i][0]]) {
        weightValue[j + itemsWP[i][0]] = weightValue[j] + itemsWP[i][1]
      }
      // console.log(weightValue)
    }
  }
  let maxValue = 0
  // console.log(weightValue)
  for (let i = 0; i < weightValue.length; i++) {
    if (weightValue[i] > maxValue) {
      maxValue = weightValue[i]
    }
  }
  console.log(maxValue)
}
