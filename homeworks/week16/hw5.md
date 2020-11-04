## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。


## [JS201] 進階 JavaScript：那些你一直搞不懂的地方

#### 1. 變數與作用域  
之前看過 Dan Abramov 的 Just JavaScript 系列，雖然目前只看到第六封信，但是對於變數、賦值的概念印象還蠻深的（那些精美的動圖真的會烙印在記憶裡），所以課程中再重新講到變數的時候就很輕鬆的看過去，沒有在課程其它部分那種「還要再學新東西」的感受。  
作用域的概念之前講到 ES6 的時候也打過基礎了，所以也沒有造成什麼困擾。但是真的是這樣嗎？在經過這週的課程之後才發現，其實之前的觀念真的都只是一個「粗淺的思考模型」，在經過老師詳細解說其它的理論之後，才發現「海平面以下」才是這些理論的主體阿！
#### 2. Hoisting  
Hoisting 的觀念就比較有挑戰性了，雖然這個詞已經聽到爛，以前也對它有一點點的瞭解（從來都沒有真的瞭解），老師從 JavaScript 運作原理、看 ECMAScript 文件開始著手，從 hoisting 的順序、ECMAScript 的內容、JavaScript 引擎的運作、Execution Context、let 與 const 與 var 的不同、TDZ……等等，一步一步的解析 hoisting 形成的過程，真的有種打通任督二脈的感覺。  
但是但是，還沒結束阿！這些觀念還缺了一些細節！
#### 3. Closure  
同樣是一個常常看到、聽到的詞，但是沒想到它可以從變數的作用域看起（其實瞭解它的原理之後也就不意外了），而且在 hoisting 的部分講到 EC 好像就已經對 JavaScript 的運作原理有一定的瞭解了，這一節又加上了 Scope Chain 之後，對於 JavaScript 內部處理變數作用域的原理又更加清楚了。  
老師最後舉了一個 closure 應用的例子，除此之外可能就要真的在實際的程式碼裡面看到才會真的知道怎麼運用了……  
#### 4. 物件導向與 prototype  
這部分雖然影片講解的蠻清楚的，看的時候觀念也都聽的懂，但是整體來說還是有一點點抽象，大概還是那種「不太知道怎麼應用」的感覺。  
要點應該就是：JavaScript 其實是沒有「真正的」物件導向的，它裡面的 class 其實都是用 function 以及 prototype 原型鍊機制來實現的。

#### 5. this  
看完課程影片之後感覺好像懂了，但是就像在作業回答裡提到的，看過「淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂」這篇文章之後感覺自已好像又不懂了 XD（至少文章開頭那些程式碼到現在都還回答不太出來到底結果是什麼），被老師文章裡提到「想要完全搞懂 this，要付出的成本可能比你想像中要大得多」嚇到，那就……先不要付出吧！把課程裡教到的內容先搞懂就好，以後慢慢再去付出了。

### 課程影片整體心得
這一週課程真的好像在追劇，一集接著一集，上一集看完覺得自已好像懂了什麼，下一集馬上就帶出另一個更深入的細節，而且以往完全不知道關係這麼親密的幾個東西：變數、作用域、提升、閉包、物件、this，就這樣通通被串起來了！好奇妙的感覺~~  
跟著老師之前寫的文章一起看，真的就是 JavaScript 進階概念大補帖。  

---

## Event Loop
看完「What the heck is the event loop anyway?」影片之後，真的很難不懂 event loop，就算對於瀏覽器、node 或其它 JavaScript 引擎會怎樣實作還是不清楚，但是應該是很清楚 event loop 最基本的工作內容了：「不停來回檢查 callback queue 跟 call stack，當 call stack 沒有東西的時候，從 callback queue 找到隊伍中的第一個，把它丟進 call stack 裡面處理。」  
這應該也就只是 event loop 最最基本的工作，因為後面提到的 render queue （應該）跟 event loop 也有些關係，總之，它就是一個在 JavaScript 裡面處理 callback 列隊與 call stack 任務堆疊的機制，處理同步、非同步程式碼的運行流程。

---

下面是複習的時候看第二期講物件導向影片為了加深印象所做的超簡單筆記。
## 物件導向「程式導師實驗計畫第二期：Week5-2：物件導向程式設計」筆記  
沒有物件導向的話：
- 程式碼很分散，很多函式散落各地
- 變數也都要分開存放

有物件的話就可以把東西集中起來，變成一個「東西」的屬性與功能。

重要的兩個關鍵字：class 與 new，藍圖與實體。
物件中的 public 與 private 函式。（private 用於封裝）

使用 setter 與 getter，可以做一些其它的操作，像是檢查內容……等等，也可以保證物件裡的東西不會被外面影響

__construct() （php class 裡面初使化物件的函式）

### 之前的課程裡就有用過
new XMLHttpRequest() 這就是一個物件，PHP 裡面的 new mysqli() 也是一個物件。

### 如何自已實作物件
先想像使用者應該如果使用，如：
```
calculator.input(1)
calculator.input('+')
calculator.input(1)
const result = calculator.getResult()
console.log(result)
```

### php 實作 DB 物件
```
class DB {
  public function __construct($s, $u, $p, $d) {
  }

  private function init() {
  }

  public function query($str) {
  }  
}

$db = new DB(server_name, username, password, database)
```

### inheritance
- in PHP
```
extends
public private protected
parent::myFunction()
```

- in JavaScript
```
extends
super.XXX()
```

### static method
`public static function XXXX()`
class 下面的方法
存不應該被改變，而且每一個實體都一樣的變數或方法

### JavaScript 真的有 class？
其實就只是 function constructor 與 prototype。

```
function XXXX () {
  this.name = name
}

XXXX.prototype.hello = function hello(){
}
```