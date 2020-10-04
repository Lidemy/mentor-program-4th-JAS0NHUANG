## hw3：Hoisting

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
```
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

程式執行流程：
1. 建構 global EC：
  宣告變數 a 以及函式 fn() 放入 global.VO 裡。
  ```
  global EC: {
    VO: {
      a: undefinde,
      fn: function
    }
  }
  ```

2. 開始執行程式：變數 a 賦值為 1  
  ```
  global EC: {
    VO: {
      a: 1,
      fn: function
    }
  }
  ```

3. 建構 fn() EC：
  fn() 作用域中宣告變數 a 以及 fn2() 放入 fn() AO 裡。
  ```
  fn() EC: {
    AO: {
      a: undefined,
      fn2: function
    }
  }
  ```
  scope chain 為：`[ fn().AO, global.VO]`  

4. 開始執行 `fn()`
  - 第一個 `console.log(a)` 在 scope chain 的 `fn().AO` 裡找到 a 為 undefined，**console 輸出 undefined**
  - a 賦值為 5 將 `fn().AO.a` 的值更新為 5
    ```
    fn() EC: {
      AO: {
        a: 5,
        fn2: function
      }
    }
    ```
  - `console.log(a)`，此時 scope chain 裡 `fn().AO` 裡 a 的值為 5，**console 輸出 5**
  - `a++` 將 `fn().AO.a` 的值更新為 6
    ```
    fn() EC: {
      AO: {
        a: 6,
        fn2: function
      }
    }
    ```
  - 重新宣告 a，但是在 fn().AO 裡已經有 a，所以看過不理。
5. 建構 fn2() EC:
  沒有任何變數、函式宣告，AO 為空。
  scope chain 為：`[ fn2().AO, fn().AO, global.VO]`
6. 開始執行 `fn2()`
  - `console.log(a)`，scope chain 裡 `fn2().AO` 沒有 a 這個變數，向上一層查詢  `fn().AO` 裡 a 的值為 6，**console 輸出 6**
  - a 賦值為 20。同樣因為 `fn2().AO` 沒有 a 這個變數，所以向上一層查詢 `fn().AO` 裡有 a，所以將 `fn().AO.a` 更新為 20。
    ```
    fn() EC: {
      AO: {
        a: 20,
        fn2: function
      }
    }
    ```
  - b 賦值為 100。因為 `fn2().AO` 與 `fn().AO` 都沒有 b 這個變數，所以直接在 `global.VO` 裡新增一個變數 b 並賦值為 100。
    ```
    global EC: {
      VO: {
        a: 1,
        fn: function
        b: 100
      }
    }
    ```
7. `fn2()` 執行結束，`fn2() EC` 從記憶體中被移除
8. `console.log(a)`，此時 scope chain 裡 `fn().AO` 裡 a 的值為 20，**console 輸出 20**
9. `fn()` 執行結束，`fn() EC` 從記憶體中被移除。
10. `console.log(a)`，`global.VO` 裡的 a 為 1，**console 輸出 1**
11. a 賦值為 10
  ```
  global EC: {
    VO: {
      a: 10,
      fn: function
      b: 100
    }
  }
  ```
12. `console.log(a)`，`global.VO` 裡的 a 為 10，**console 輸出 10**
13. `console.log(b)`，`global.VO` 裡的 b 為 100，**console 輸出 100**

完整輸出結果：
```
undefined
5
6
20
1
10
100
```