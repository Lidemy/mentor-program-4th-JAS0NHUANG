// 三天後自已重寫
// LIOJ 寫法

solve([
  '3 3', // 迷宮高與寬（先高、後寬）
  '...', // 迷宮圖樣
  '...',
  '...'
])

function solve (lines) {
  // 將高、寬轉換為數字存入陣列
  const HWArray = lines[0].split(' ')
  // console.log(HWArray)
  // 分別取出高 H、寬 W
  const H = Number(HWArray[0])
  const W = Number(HWArray[1])
  // 將迷宮存入陣列
  const maze = []
  for (let i = 1; i < lines.length; i++) {
    maze.push(lines[i])
  }
  // console.log(maze)
  // 計算出終點
  const endX = H - 1
  const endY = W - 1

  // 設定一個空陣列等一下用來儲存走到每個點的步數
  const stepsArr = []
  // 先在這個空陣列裡面填入與高度同數量的空陣列
  for (let i = 1; i < H + 1; i++) {
    stepsArr.push([])
  }
  // 設定起點（0, 0）到起點的步數為 0
  stepsArr[0][0] = 0

  // 設定一個列隊，用來存入可以走的點，起始設定為起點： 0, 0
  const pointQueue = [{ x: 0, y: 0 }]
  // 設定一個向四個方向走的陣列
  const directions = [
    { dx: 0, dy: 1 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: -1, dy: 0 }
  ]

  // 開始走迷宮
  // 只要列隊中還有未走過的點就執行以下運算
  while (pointQueue.length) {
    // 先取出目前所在的點，然後從 pointQueue 列隊中刪除
    const currentPoint = pointQueue.shift()
    const x = currentPoint.x
    const y = currentPoint.y
    // console.log(x, y)
    // 往四個方向走，進行判斷
    for (let i = 0; i < directions.length; i++) {
      // console.log(directions[i].dx)
      const newX = x + directions[i].dx
      const newY = y + directions[i].dy
      // 判斷條件：
      // 超過邊界或者路不能走 > 不走
      if (newX < 0 || newY < 0 || newX > endX || newY > endY || maze[newX][newY] !== '.') continue
      // 要走的點的步數大於原始點加上 1 步或者不是未走過的路 > 不走
      if (stepsArr[newX][newY] <= stepsArr[x][y] + 1 || stepsArr[newX][newY] !== undefined) continue
      // 通過以上判斷則為要走的點。
      // 將到達原始點的步數加上 1 步，放入儲存步數的陣列中 stepsArr[newX][newY]
      stepsArr[newX][newY] = stepsArr[x][y] + 1
      // 將可以走的點加入列隊，等待成為之後的起始點。（列隊中可以同時有好幾個點）
      pointQueue.push({ x: newX, y: newY })
      // console.log(pointQueue)
      // console.log(`newX and newY: ${newX} : ${newY}`)
    }
  }
  // console.log(stepsArr)
  console.log(stepsArr[endX][endY])
}
