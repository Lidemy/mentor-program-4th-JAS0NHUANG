``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
##### 1. 進入 JavaScript 程式會先宣告函式 isValid，不會直接執行它
##### 2. 執行最後一行呼叫 isValid 這個函式
##### 3. 執行函式 isValid 並將 [3, 5, 8, 13, 22, 35] 這個陣列傳入做為 arr 參數的引數
##### 4. 執行第二行（第一個 for 迴圈）（arr.lenght 陣列長度為 6）
  - 第一圈： i = 0，i 比 6 小，進入迴圈
    - 執行第三行，判斷引數陣列 Index 為 0 的數字（3）不小於零，條件不成立，不會回傳 'invalid'
    - i 加 1，回到第二行
  - 第二圈： i = 1，i 比 6 小，進入迴圈
    - 執行第三行，判斷引數陣列 Index 為 1 的數字（5）不小於零，條件不成立，不會回傳 'invalid'
    - i 加 1，回到第二行
  - 第三圈： i = 2，i 比 6 小，進入迴圈
    - 執行第三行，判斷引數陣列 Index 為 2 的數字（8）不小於零，條件不成立，不會回傳 'invalid'
    - i 加 1，回到第二行
  - 第四圈： i = 3，i 比 6 小，進入迴圈
    - 執行第三行，判斷引數陣列 Index 為 3 的數字（13）不小於零，條件不成立，不會回傳 'invalid'
    - i 加 1，回到第二行
  - 第五圈： i = 4，i 比 6 小，進入迴圈
    - 執行第三行，判斷引數陣列 Index 為 0 的數字（22）不小於零，條件不成立，不會回傳 'invalid'
    - i 加 1，回到第二行
  - 第六圈： i = 5，i 比 6 小，進入迴圈
    - 執行第三行，判斷引數陣列 Index 為 0 的數字（35）不小於零，條件不成立，不會回傳 'invalid'
    - i 加 1，回到第二行
  - 第七圈： i = 6，i 不小於 6，不進入迴圈, 跳至第五行
##### 5. 執行第五行（第二個 for 迴圈）（arr.lenght 陣列長度為 6）
  - 第一圈： i = 2，i 比 6 小，進入迴圈
    - 執行第六行，判斷引數陣列 Index 為 2 的數字（8）等於 Index 為 2 - 1 的數字（5）與 Index 為 2 - 2 的數字（3）之和（8 === 5 + 3），條件不成立，不會回傳 'invalid'
    - i 加 1，回到第五行，進入下一圈
  - 第二圈： i = 3，i 比 6 小，進入迴圈
    - 執行第六行，判斷引數陣列 Index 為 3 的數字（13）等於 Index 為 3- 1 的數字（8）與 Index 為 3 - 2 的數字（8）之和（13 === 8 + 5），條件不成立，不會回傳 'invalid'
    - i 加 1，回到第五行，進入下一圈
  - 第三圈： i = 4，i 比 6 小，進入迴圈
    - 執行第六行，判斷引數陣列 Index 為 4 的數字（22）不等於 Index 為 4 - 1 的數字（13）與 Index 為 4 - 2 的數字（8）之和（22 !== 8 + 13），條件成立，回傳字串 'invalid'
    - 第六行以後的程式都不會再被執行，函式結束
##### 6. 程式執行完成

整個程式會先判斷引入的數列中所有的數字是否為正數，然後再檢查從第 3 個數字起（index 2）的數字，是否為前兩個數字的合，也就是有費氏數列的特性（但是不一定是費氏數列？）。  
例如：[0, 1, 1, 2] 為費氏數列，[0, 2, 2, 4, 6, 10] 則不是費氏數列。（這裡我不太確定費氏數列的定義是不是一定要從 0, 1 開始的才算）  

參考資料：  
[Connecting Fibonacci and geometric sequences](https://www.johndcook.com/blog/2009/05/11/fibonacci-geometric-series/)   
他的文章裡有提到 **generalized Fibonacci sequence** 「廣義的費氏數列」，所以非 0 或 1 起始的就是廣義的費氏數列？  

[Math is Fun - Fibonacci Sequence](https://www.mathsisfun.com/numbers/fibonacci-sequence.html)  
還可以有負的？  
