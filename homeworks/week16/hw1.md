## hw1：Event Loop
在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

---

上面這段程式碼的執行過程：
1. 第一行呼叫 `console.log(1)`，把 `console.log(1)` 放入 Call Stack 並直接執行。
  **console 輸出 1** 之後 `console.log(1)` 從 Call Stack 裡被移除。
2. 第二行呼叫  `setTimeout()`, 執行 `setTimeout()`  web api。
  setTimeout 在 0 秒之後，將它裡面的暱名 callback function `() => { console.log(2) }` 放入 callback queue 中等待被執行。
3. 第五行呼叫 `console.log(3)`，把 `console.log(3)` 放入 Call Stack 並直接執行。
  **console 輸出 3** 之後 `console.log(3)` 從 Call Stack 裡被移除。
4. 第六行呼叫 `setTimeout()`，執行 `setTimeout()`  web api。
  setTimeout 在 0 秒之後，將它裡面的暱名 callback function `() => { console.log(4) }` 放入 callback queue 中等待被執行。
5. 第九行呼叫 `console.log(5)`，把 `console.log(5)` 放入 Call Stack 並直接執行。
  **console 輸出 5** 之後 `console.log(5)` 從 Call Stack 裡被移除。
6. Call stack 已經被清空，並且沒有其它 function call，event loop 開始在 callback queue 裡面找還沒有處理的 function。
7. 找到 `() => { console.log(2) }`，event loop 將 `() => { console.log(2) }` 放入 call stack 處理，執行暱名函式，呼叫 `console.log(2)` 並放入 call stack 直接執行。
  **console 輸出 2** 之後 `console.log(2)` 從 call stack 裡被移除，接著暱名函式也從 call stack 裡被移除。
8. 找到 `() => { console.log(4) }`，event loop 將 `() => { console.log(4) }` 放入 call stack 處理，執行暱名函式，呼叫 `console.log(4)` 並放入 call stack 直接執行。
  **console 輸出 4** 之後 `console.log(4)` 從 call stack 裡被移除，接著暱名函式也從 call stack 裡被移除。
9. 整段程式碼執行結束。

完整輸出內容為：
```
1
3
5
2
4
```