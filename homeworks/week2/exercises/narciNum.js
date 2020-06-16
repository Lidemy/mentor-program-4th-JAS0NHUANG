function checkNarciNum (n, m) {
  for (let i = n; i <= m; i++) {
    const sum = getDigitSum(i)
    if (sum === i) {
      console.log(i)
    }
  }
  function getDigitSum (i) {
    const power = i.toString().length
    let sum = 0
    while (i / 10 > 0) {
      sum += Math.pow(i % 10, power)
      i = Math.floor(i / 10)
    }
    return sum
  }
}

checkNarciNum(5, 10000000)

function solve (lines) {
  const linesArr = lines[0].split(' ')
  const n = Number(linesArr[0])
  const m = Number(linesArr[1])

  for (let i = n; i <= m; i++) {
    const sum = getDigitSum(i)
    if (sum === i) {
      console.log(sum)
    }
  }
  function getDigitSum (i) {
    const power = i.toString().length
    let sum = 0
    while (i / 10 > 0) {
      sum += Math.pow(i % 10, power)
      i = Math.floor(i / 10)
    }
    return sum
  }
}

solve(['0 100000'])
