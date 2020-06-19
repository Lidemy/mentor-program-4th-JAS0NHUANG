// 研究老師的寫法

function mazerunner (map) {
  // 設定高與寬
  const h = 10
  const w = 10
  // 設定起點與終點
  const startX = 0
  const startY = 0
  const endX = h - 1
  const endY = w - 1
  // 創造一個 ans 陣列儲存到每個可以走的點所需要的步數
  const ans = []
  // 在 ans 陣列裡填入與高度（h）相同的空陣列
  for (let i = 0; i < h; i++) {
    ans[i] = []
  }

  // 將 ans[0][0] 的步數設為 0 (起點到起點，走 0 步）
  ans[0][0] = 0
  // 建立一個儲存可以走的點的陣列，內容為 x y 兩點的物件
  const queue = [{ x: startX, y: startY }]
  // 建立一個往四個方向走的物件陣列
  const directions = [
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: -1 }
  ]
  // 如果 queue 裡面還有物件
  while (queue.length) {
    // 將目前所在點傳入 X 與 Y
    const { x, y } = queue.shift() // 忘記要用 .shift()
    for (const d of directions) { // 語法寫錯 (d in directions)
      // 設定前進方向的點
      const newX = x + d.dx
      const newY = y + d.dy
      // 判斷是否超出邊界及是否可走
      if (newX >= h || newX < 0 || newY >= w || newY < 0 || map[newX][newY] !== '.') continue
      // 判斷步數是否比較少
      if (ans[x][y] + 1 >= ans[newX][newY] && ans[newX][newY] !== undefined) continue // 寫錯為 map[][]
      ans[newX][newY] = ans[x][y] + 1
      queue.push({ x: newX, y: newY })
    }
  }
  console.log(ans[endX][endY])
}

mazerunner([
  '.#########',
  '.........#',
  '########.#',
  '#........#',
  '#.########',
  '#........#',
  '########.#',
  '#........#',
  '#.######.#',
  '########..'
])
