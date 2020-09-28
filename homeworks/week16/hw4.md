## hw4：What is this?

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```  

程式執行流程：
1. 建構 global EC：
  ```
  global EC: {
    global VO: {
      obj: object,
      obj2: function,
      hello: function
    }
  }
  ```
2. 執行 `obj.inner.hello()`，呼叫 `hello()` 這個函式的是 `obj.inner`，所以 `hello()` 函式裡的 `this` 就是 `obj.inner`，而 `obj.inner` 裡的 value 是 2，所以 **console 輸出 2**。
3. 執行 `obj2.hello()`，呼叫 `hello()` 這個函式的是 `obj2`，而 `obj2` 又等於 `obj.inner`，所以 `hello()` 函式裡的 `this` 就是 `obj.inner`，而 `obj.inner` 裡的 value 是 2，所以 **console 輸出 2**。
4. 執行 `hello()` 因為是在程式的最上層呼叫 `hello()` 這個函式，所以這裡的 `this` 會是一個全域的物件（在瀏覽器裡會是 window，node 環境裡會是 global），而這個全域物件上沒有 value 的值，所以 **console 輸出 undefined** （這裡並沒有使用 strict mode，所以輸出的是 undefined，如果使用 strict mode 的話，那麼 `this` 本身就會是 undefined，輸出的結果就會是一個 `Cannot read property 'value' of undefined` 的錯誤訊息。）

大原則就是，this 等於呼叫函式的那個物件。  但是看過「淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂」這篇文章之後，發現這個表達應該也只能適用於「大部分」的情況，細節就要再更仔細的去鑽研才能瞭解了。

完整輸出：
```
2
2
undefined
```
  