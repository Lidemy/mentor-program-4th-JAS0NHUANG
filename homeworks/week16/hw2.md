## hw2：Event Loop + Scope

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

程式碼執行流程：

1. 進入 for 迴圈，建構 global EC，在 global VO 裡面設定一個 i 變數，因為沒有其它變數、函式要初始化，所以直接進入執行階段。
  ```
  global EC: {
    VO : {
      i: undefined
    }
  }
  ```

2. 第一圈迴圈：
  i 變數賦值為 0
  ```
  global EC: {
    VO : {
      i: 0 
    }
  }
  ```
  符合 `i<5` 條件，呼叫 `console.log('i: ' + i)`，直接放入 call stack 並執行。
  **console 輸出 `i: 0`**，`console.log('i: ' + i)` 從 call stack 被移除。
  呼叫 `setTimeout()`，執行 `setTimeout()`  web api。
  等待 `0 * 1000` 毫秒之後，將它裡面的暱名 callback fucntion 放入 callback queue 列隊等待被執行。

3. 第二圈迴圈：
  i 變數 `++`，賦值為 1 
  ```
  global EC: {
    VO : {
      i: 1 
    }
  }
  ```
  符合 `i<5` 條件，呼叫 `console.log('i: ' + i)`，直接放入 call stack 並執行。
  **console 輸出 `i: 1`**，`console.log('i: ' + i)` 從 call stack 被移除。
  呼叫 `setTimeout()`，執行 `setTimeout()`  web api。
  等待 `1 * 1000` 毫秒之後，將它裡面的暱名 callback fucntion 放入 callback queue 列隊等待被執行。

4. 第三圈迴圈：
  i 變數 `++`，賦值為 2 
  ```
  global EC: {
    VO : {
      i: 2 
    }
  }
  ```
  符合 `i<5` 條件，呼叫 `console.log('i: ' + i)`，直接放入 call stack 並執行。
  **console 輸出 `i: 2`**，`console.log('i: ' + i)` 從 call stack 被移除。
  呼叫 `setTimeout()`，執行 `setTimeout()`  web api。
  等待 `2 * 1000` 毫秒之後，將它裡面的暱名 callback fucntion 放入 callback queue 列隊等待被執行。

5. 第四圈迴圈：
  i 變數 `++`，賦值為 3 
  ```
  global EC: {
    VO : {
      i: 3 
    }
  }
  ```
  符合 `i<5` 條件，呼叫 `console.log('i: ' + i)`，直接放入 call stack 並執行。
  **console 輸出 `i: 3`**，`console.log('i: ' + i)` 從 call stack 被移除。
  呼叫 `setTimeout()`，執行 `setTimeout()`  web api。
  等待 `3 * 1000` 毫秒之後，將它裡面的暱名 callback fucntion 放入 callback queue 列隊等待被執行。

6. 第五圈迴圈：
  i 變數 `++`，賦值為 4 
  ```
  global EC: {
    VO : {
      i: 4 
    }
  }
  ```
  符合 `i<5` 條件，呼叫 `console.log('i: ' + i)`，直接放入 call stack 並執行。
  **console 輸出 `i: 4`**，`console.log('i: ' + i)` 從 call stack 被移除。
  呼叫 `setTimeout()`，執行 `setTimeout()`  web api。
  等待 `4 * 1000` 毫秒之後，將它裡面的暱名 callback fucntion 放入 callback queue 列隊等待被執行。

7. 第六圈迴圈：
  i 變數 `++`，賦值為 5 
  ```
  global EC: {
    VO : {
      i: 5
    }
  }
  ```
  不符合 `i<5` 條件，結束迴圈

8. Event loop 在 callback queue 找到列隊中的第一個 callback function `() => { console.log(i) }`，將它放入 call stack 並執行。
  暱名函式將 `console.log(i)` 放入 call stack 並執行。
  **console 輸出 5** （global VO 裡的 i 為 5），`console.log(i)` 執行完畢，從 call stack 被移除。
  暱名函式執行完畢，從 call stack 被移除。

9. Event loop 在 callback queue 找到列隊中的第二個 callback function `() => { console.log(i) }`，將它放入 call stack 並執行。
  暱名函式將 `console.log(i)` 放入 call stack 並執行。
  **console 輸出 5** （global VO 裡的 i 為 5），`console.log(i)` 執行完畢，從 call stack 被移除。
  暱名函式執行完畢，從 call stack 被移除。

10. Event loop 在 callback queue 找到列隊中的第三個 callback function `() => { console.log(i) }`，將它放入 call stack 並執行。
  暱名函式將 `console.log(i)` 放入 call stack 並執行。
  **console 輸出 5** （global VO 裡的 i 為 5），`console.log(i)` 執行完畢，從 call stack 被移除。
  暱名函式執行完畢，從 call stack 被移除。

 11. Event loop 在 callback queue 找到列隊中的第四個 callback function `() => { console.log(i) }`，將它放入 call stack 並執行。
  暱名函式將 `console.log(i)` 放入 call stack 並執行。
  **console 輸出 5** （global VO 裡的 i 為 5），`console.log(i)` 執行完畢，從 call stack 被移除。
  暱名函式執行完畢，從 call stack 被移除。

12. Event loop 在 callback queue 找到列隊中的第五個 callback function `() => { console.log(i) }`，將它放入 call stack 並執行。
  暱名函式將 `console.log(i)` 放入 call stack 並執行。
  **console 輸出 5** （global VO 裡的 i 為 5），`console.log(i)` 執行完畢，從 call stack 被移除。
  暱名函式執行完畢，從 call stack 被移除。

13. callback queue、call stack 已清空，程式結束。

完整輸出內容為：
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```

註：因為上面的秒數都是 callback function 被放入 callback queue 的時間，並不是真正執行完成的時間，所以它們「最少」會花 i * 1000 毫秒，但是實際上執行的時間則不會那麼準確。