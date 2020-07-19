# 我目前的進度

### 第四週（07/06 ~ 07/12）：網路基礎

#### 指定教材

額外補充一個影片，英文 ok 的話可以看：[CS75 (Summer 2012) Lecture 0 HTTP Harvard Web Development David Malan](https://www.youtube.com/watch?v=8KuO4r5CHjM)，內容與 NET101 類似，只是讓大家再做個複習


### 第六週（07/20 ~ 07/26）：前端基礎 HTML 與 CSS

也可以先看一下這兩篇文章（很多地方你會看不懂，但沒關係）先培養一下對前端的感覺，等幾週過後當我們學得越來越多，再看一次會有完全不同的感受：[零基礎的小明要如何成為前端工程師？](https://medium.com/hulis-blog/frontend-engineer-guide-297821512f4e)、[跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR](https://medium.com/@hulitw/introduction-mvc-spa-and-ssr-545c941669e9)

#### 指定教材

可以看 [Chrome 網頁除錯功能大解密](https://www.udemy.com/chrome-devtools/)來熟悉 Chrome devtool 的使用方式。

如果覺得課程太理論，想要看比較偏實戰的，可以看 Lidemy 上第四期的「第六週特別補充課程：position 與 display 實戰篇 by minw 助教」相關單元，會有各種切版實戰。

若是還有時間，可以透過這兩個小遊戲來熟悉 CSS Selector 跟 Flexbox 排版的方法：

1. [CSS Diner](https://flukeout.github.io/)
2. [Flexbox Froggy](http://flexboxfroggy.com/)

如果你覺得切版講得很爛，可以參考看看這個：[金魚都能懂的網頁設計入門 - 金魚都能懂了你還怕學不會嗎](https://ithelp.ithome.com.tw/users/20112550/ironman/2072)

[HW6 作業連結](/homeworks/week6)

#### 自我檢測

- [ ] P1 你知道如何使用有語意的（semantic）標籤
- [ ] P1 你知道基本 SEO 的概念
- [ ] P1 你知道 inline、block 跟 inline-block 的區別
- [ ] P1 你知道什麼是 box model
- [ ] P1 你知道 position 的所有屬性及其差別
- [ ] P2 你知道 :hover, :before, :after
- [ ] P2 你知道 :nth-child 的各種用法
- [ ] P2 你熟悉 CSS selector，可以輕鬆選到想選到的元素

### 第七週（07/27 ~ 08/02）：前端基礎 JavaScript

這一週將會進入到 JavaScript，讓網頁變得有互動性，並結合 `<form>` 做表單驗證，以及讓大家寫出簡單的網頁應用程式。

這會是我們第一次把 JavaScript 應用在網頁上，來學習怎麼使用 JavaScript 操控 DOM 物件，讓網頁動起來。

#### 指定教材

這一週需要的東西幾乎都在 [FE102] 前端必備：JavaScript 這堂課裡面，看到「中場總結」就好了，後面的可以先不用看。

針對 DOM 的事件傳遞，可以參考這一篇：[DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)

[HW7 作業連結](/homeworks/week7)

#### 自我檢測

- [ ] P1 你知道 JavaScript 跑在網頁上跟跑在 Node.js 上差在哪裡
- [ ] P1 你知道 DOM 是什麼
- [ ] P1 你知道如何用 JavaScript 操控 DOM 物件
- [ ] P1 你知道如何幫一個按鈕加上 event listener
- [ ] P1 你知道捕獲與冒泡是什麼
- [ ] P1 你知道什麼是事件代理（delegation）
- [ ] P2 你知道怎麼用 JavaScript 更改元素的 style
- [ ] P2 你知道 preventDefault 與 stopPropagation 的差異 

### 第八週（08/03 ~ 08/09）：前端基礎串 API

之前在第四週時有提過 API，也有讓大家試著用 node.js 寫些小程式來串接。

而前端當然也能串接 API，理解前後端如何串接是很重要的一部分，因此這週會花滿多心力再來講 API 串接，讓大家複習一下 API 的概念，並且教大家什麼是 Ajax。

#### 指定教材

把 [FE102] 前端必備：JavaScript 中場總結之後的課程看完。也可以看這一篇增進自己對 Ajax 的理解：[輕鬆理解 Ajax 與跨來源請求](https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/)

[HW8 作業連結](/homeworks/week8)

#### 自我檢測

- [ ] P1 你知道什麼是 API
- [ ] P1 你知道什麼是 Ajax
- [ ] P1 你知道從網頁前端呼叫 API 與在自己電腦上寫程式呼叫的差異
- [ ] P1 你知道什麼是同源政策（Same-origin policy）
- [ ] P1 你知道如何存取跨網域的資源（CORS）
- [ ] P1 你知道什麼是 JSON
- [ ] P2 你知道什麼是 JSONP 及其原理

### 第九週（08/10 ~ 08/16）：後端基礎 PHP 與 MySQL

前端基礎打得差不多以後，就要進入後端的課程，這次課程會以 PHP 為主要的程式語言。

這週的課程會講解 PHP 基本觀念、語法，並且教大家安裝設定 MySQL，寫出簡單的 CRUD 應用。

#### 指定教材

觀看 [BE101] 用 PHP 與 MySQL 學習後端基礎並跟著動手做，看到「真正的實戰：留言板 - 修正問題篇」裡面的「PHP 內建 session 機制」就好，同時跟著裡面的教學把留言板實作出來。

並且透過以下幾篇文章加深對 Cookie 與 Session 的理解：

1. [白話 Session 與 Cookie：從經營雜貨店開始](https://medium.com/@hulitw/session-and-cookie-15e47ed838bc)
2. [淺談 Session 與 Cookie：一起來讀 RFC](https://blog.huli.tw/2019/08/09/session-and-cookie-part2/)
3. [深入 Session 與 Cookie：Express、PHP 與 Rails 的實作](https://blog.huli.tw/2019/08/09/session-and-cookie-part3/)

[HW9 作業連結](/homeworks/week9)

#### 自我檢測

- [ ] P1 你知道 PHP 是什麼
- [ ] P1 你知道前端與後端的差別
- [ ] P1 你知道什麼是資料庫
- [ ] P1 你了解基本的 SQL 語法，包括 Select、Insert Into、Delete 與 Update
- [ ] P1 你能夠寫出基本的 CRUD 應用
- [ ] P1 你知道什麼是 Session
- [ ] P1 你知道什麼是 Cookie
- [ ] P1 你知道 Session 與 Cookie 的差別

### 第十週（08/17 ~ 08/23）：複習週

這是第二次的複習週，在前四週我們一共學了：

1. HTML 與 CSS
2. DOM 以及 JavaScript 如何與網頁互動
3. 前端利用 Ajax 與後端串接
4. PHP 與 MySQL

這一週可以讓你有時間好好複習之前的內容，若是覺得都 ok 了，也可以試試看之前的進階挑戰題、挑戰題以及超級挑戰。

這次跟第五週一樣，怕大家太無聊，於是準備了兩個有趣的小遊戲給大家玩。

### 綜合能力測驗

這邊有一份參考某間公司面試考題的[綜合能力測驗](http://mentor-program.co/huli/game/index.php)，還滿有趣的，主要是測前幾週的整合能力。

如果你點進去看到一片白畫面，這是正常的，並不是網頁壞掉。難道網頁看不見東西就是真的沒東西嗎？

### 闖關遊戲

一共十關，看你能闖到第幾關：[r3:0 異世界網站挑戰](https://r30challenge.herokuapp.com/)（特別感謝第三期 @minw 製作遊戲）。

[HW10 作業連結](/homeworks/week10)

### 第十一週（08/24 ~ 08/30）：資訊安全

這一週我們要強調一個很重要的觀念：資訊安全。

無論你是前端還是後端，都必須時時刻刻在心裡惦記著資訊安全的概念，總結為一句話就是：「不要相信任何來自 client 端的資料」，只要能做到這點，其實就可以阻止掉很多的惡意攻擊。

因此這一週會繼續以留言板當作主軸，介紹非常非常重要的資訊安全相關概念。一段寫不好的程式碼，有可能就跟大門破了一個洞一樣，很輕易地就可以讓攻擊者入侵，不費吹灰之力。資訊安全真的要好好學，至少要知道原理以及防禦方法。

####  指定教材

把 [BE101] 用 PHP 與 MySQL 學習後端基礎的其他部分繼續看完，看到「真正的實戰：留言板 - 再次修正問題篇」結束，有時間的話也可以把整堂課都看完。

也可以看 [CS101] 初心者的計概與 coding 火球術：4-3、5-4 複習一下資訊安全相關的觀念。想知道更多資安相關的概念，可以參考：[程式導師實驗計畫第二期：Week6-2：資訊安全](https://www.youtube.com/watch?v=HGjjxKsCgr0)

有一個與資安相關的東西叫做 CSRF，在課程中沒有講，是考驗你自學能力的時候，推薦閱讀這篇：[讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)

[HW11 作業連結](/homeworks/week11)

#### 自我檢測

- [ ] P1 你知道什麼是雜湊（Hash function）
- [ ] P1 你知道什麼是加密（Encryption）
- [ ] P1 你知道雜湊與加密的差別
- [ ] P1 你知道什麼是 SQL Injection 以及如何防範
- [ ] P1 你知道什麼是 XSS 以及如何防範
- [ ] P1 你知道為什麼儘管前端做了驗證，後端還是要再做一次驗證
- [ ] P2 你知道什麼是 CSRF 以及如何防範

### 第十二週（08/31 ~ 09/06）：前後端整合

前幾週我們學會怎麼用後端 PHP 開發出一個網站，而在更早的第八週，我們學會了用 JavaScript 來串接 API，前端負責顯示資料，後端只負責提供資料。

這一週要整合之前學到的東西，也就是說要自己開發出 API，然後讓自己寫的前端可以串接！因此，這週的內容可能會有點複雜，但我會先示範給你看，讓你理解到底這週的模式跟以往有何不同。

這是非常重要的一週，但是只要能確實理解差異在哪裡，你就能把前後端的關係跟概念弄得很清楚。

除此之外，也會教兩個新的前端工具：jQuery 與 Bootstrap，前者可以讓我們快速又方便地去操作 DOM，後者可以讓我們快速打造出乾淨漂亮的頁面。

#### 指定教材

請先參考 [BE101] 裡面「真正的實戰：留言板 - API 篇」的內容，跟著影片一步步把留言板 API 做出來，再來可以看 [FE201] 前端中階：那些前端會用到的工具們，學習 jQuery 與 Bootstrap 的使用，並且跟著裡面的教學整合 [BE101] 裡面的 API。

[HW12 作業連結](/homeworks/week12)

#### 自我檢測

- [ ] P1 你知道什麼是 SPA
- [ ] P1 你知道怎麼樣用 PHP 自己寫出 API
- [ ] P1 你知道如何在前端與自己開的 API 串接
- [ ] P1 你知道在 server 與在 client render 的差別
- [ ] P1 你知道 jQuery 是做什麼的
- [ ] P1 你知道 jQuery 與 vanilla js 的差別
- [ ] P1 你知道什麼是 Bootstrap
- [ ] P2 你知道 Bootstrap 原理及如何應用

### 第十三週（09/07 ~ 09/13）：現代前端工具

這週基本上是延續上週的課程，介紹簡單好用的現代前端工具，包括：

1. CSS 預處理器
2. Gulp
3. Webpack

也會幫大家補充一些 CSS 相關的知識，像是：

1. CSS Selector 權重的計算方式
2. CSS Sprites 與 Data URI

#### 指定教材

可以看 [FE201] 前端中階：那些前端會用到的工具們來學習這週的工具。

[HW13 作業連結](/homeworks/week13)

#### 自我檢測

- [ ] P1 你知道 webpack 的目的以及原理
- [ ] P1 你熟悉如何使用 webpack 進行模組化開發
- [ ] P2 你知道 gulp 的目的以及原理
- [ ] P2 你熟悉如何使用 gulp 建構自動化工作流程
- [ ] P2 你知道 CSS 優化的一些小技巧
- [ ] P2 你知道 CSS Sprites 與 Data URI 的優缺點
- [ ] P2 你知道什麼是 uglify 與 minify

### 第十四週（09/14 ~ 09/20）：伺服器與網站部署

有了自己的前後端程式之後，就可以開始來部署了。這週的重點會放在帶大家直接去買主機（AWS、[Digital Ocean](https://m.do.co/c/2e78666c0866)、Linode），並且了解如何連上主機。

也會讓大家購買自己的網域，理解如何將網域以及主機串連起來，讓大家可以連線到你的網站。

除此之外，也會稍微提到一些系統架構，還有跟資料庫的一些知識，像是 ACID、Transaction、View 以及 Stored procedure 等等。

這週也要特別感謝 [gandi](https://www.gandi.net/) 連續三期全額贊助了網域的費用 <(_ _)>。


#### 指定教材

這週最重要的就是部署自己的網站，這邊會希望大家自己先查資料，試試看能不能靠自己就部署成功。

若是不行的話，請參考以下幾篇：

1. [部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)
2. [一小時完成 VPS (Virtual Private Server) 部署](https://github.com/Lidemy/mentor-program-2nd-futianshen/issues/21)
3. [如何遠端連接虛擬主機上的 mySQL 資料庫 ？](https://github.com/Lidemy/mentor-program-2nd-futianshen/issues/33)

接著有關於專有名詞的部分，只要稍微聽過有個印象就好了，暫時不需要深入研究。可以看[程式導師實驗計畫：Lesson 8-2 之資料庫](https://www.youtube.com/watch?v=iDG8Ha2uZPs)來學習什麼是 NoSQL、transaction、ACID 與 Lock。

然後看看[程式導師實驗計畫第二期：Week8-1 後端基礎（下）](https://www.youtube.com/watch?v=QiCm9JE43KM)來學習什麼是 View、Stored Procedure 與 Trigger（這影片前半段是以前 Todo list 作業的檢討，可以跳過）。

最後是系統架構，可以稍微看一下：[CS75 (Summer 2012) Lecture 9 Scalability Harvard Web Development David Malan](https://www.youtube.com/watch?v=-W9F__D3oY4)

[HW14 作業連結](/homeworks/week14)

#### 自我檢測

- [ ] P1 你知道虛擬空間、虛擬主機以及實體主機的差別
- [ ] P1 你知道什麼是網域（Domain）
- [ ] P1 你知道如何設定網域（A、CNAME）
- [ ] P1 你知道如何用 SSH 遠端連線到自己的主機
- [ ] P1 你知道如何部署應用程式
- [ ] P2 你知道什麼是 No SQL
- [ ] P2 你知道什麼是 Transaction 與 lock
- [ ] P2 你知道資料庫的 ACID 是什麼
- [ ] P3 你知道什麼是資料庫的 View 以及使用時機
- [ ] P3 你知道什麼是 Stored procedure 以及如何使用
- [ ] P3 你知道資料庫的 Trigger 以及使用時機

### 第十五週（09/21 ~ 09/27）：複習週

終於到了第三次的複習週，這次要複習的東西比以往都多了點：

1. Session 與 Cookie 的差異
2. 資訊安全（Hashing、SQL Injection、XSS）
3. jQuery
4. Bootstrap
5. CSS 預處理器、Webpack
6. 部署

這一週的作業除了心得以外，也提供了一個跟以往不太一樣的測驗：[網站前後端開發基礎測試](https://github.com/Lidemy/mentor-program-3rd/issues/5)，一共十題簡答題，答案預設是隱藏的，自己答完之後可以自己點開對答案。

[HW15 作業連結](/homeworks/week15)

### 第十六週（09/28 ~ 10/04）：JavaScript 核心與物件導向

這次的第一個重點在於物件導向，之前都沒有時間好好講過，這一週特別講一下物件導向。

再來是 JavaScript 的一些重要基礎以及瀏覽器運作時的機制。

第一個重點是瀏覽器在運行 JavaScript 時的 Event Loop 機制。

第二個重點就是 JavaScript 的一些重要基礎，包含：scope、hoisting、closure、prototype、this 等等。

#### 指定教材

1. 程式導師實驗計畫第二期：Week9-2 JavaScript 執行原理
2. [JS201] 進階 JavaScript：那些你一直搞不懂的地方
3. [What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

[HW16 作業連結](/homeworks/week16)

#### 自我檢測

- [ ] P1 你知道 Event Loop 的運作方式
- [ ] P1 你知道什麼是作用域（Scope）
- [ ] P1 你知道 Hoisting（提升）是什麼
- [ ] P1 你知道 Hoisting 的原理為何
- [ ] P1 你知道 Closure（閉包）是什麼
- [ ] P1 你能夠舉出一個運用 Closure 的例子
- [ ] P1 你知道 Prototype 在 JavaScript 裡是什麼
- [ ] P1 你知道大部分情況下 this 的值是什麼

### 第十七週（10/05 ~ 10/11）：現代後端開發（上）

[Express](https://expressjs.com/) 是可以在 Node.js 環境下執行的輕量後端框架，自由度極高，也能夠快速開發出後端應用程式。

跟其他有完整 MVC 架構的框架相比，Express 其實鬆散（或者說自由）很多，許多地方並沒有強制規範，都只是按照前人的方法或者是慣例來實踐，十個人可能會有十種不的寫法。

有了之前 PHP 以及 JS 的基礎，我相信學習 Express 會快速許多，因此在這一週裡面可以試試看能不能快速上手 Express 並完成作業。

#### 指定教材：

1. [BE201] Express 與 Sequelize：「ORM 與 Sequelize」單元前所有內容

[HW17 作業連結](/homeworks/week17)

#### 自我檢測

- [ ] P1 學習如何使用 Express 及其相關套件
- [ ] P1 我理解為什麼會需要框架

### 第十八週（10/12 ~ 10/18）：現代後端開發（下）

上一週我們學會了 Express，對基本的操作都已經很熟悉了。

這一週要介紹的是一個新的東西：ORM（Object Relational Mapping），簡單來說就是把一個程式碼裡面的物件跟資料庫的物件做映射，優點就是當你操作程式裡的物件時，就會改到資料庫裡的資料。

而且你幾乎不需要寫任何 SQL Query，因為 ORM 都會幫你處理的好好的，你只要學習怎麼用就可以了。這一週會使用 Sequelize 這個套件來做 ORM 以及串接資料庫，讓你體驗看看不用寫 SQL Query 的爽快感。

最後會使用 Nginx + PM2 來部署我們之前寫好的 Web Application。

#### 指定教材

[BE201] Express 與 Sequelize 全部看完

[HW18 作業連結](/homeworks/week18)

#### 自我檢測

- [ ] P1 了解什麼是 ORM
- [ ] P1 了解 ORM 的優缺點
- [ ] P1 了解什麼是 N+1 problem 
- [ ] P1 我知道如何使用 Nginx
- [ ] P1 我知道如何使用 PM2
- [ ] P1 我知道如何部署 Node.js 應用程式

### 第十九週（10/19 ~ 10/25）：產品開發流程

前面講了很多技術相關的東西，但是在產品面上一直沒什麼著墨。下一週開始就要進入到課程的最後一個階段了，也就是前端框架以及期末作業。在開始之前，先跟大家講一下產品開發流程還有工作流程會是一件滿重要的事。

這一週會帶大家看看學習系統在開發新功能時的一些記錄，讓大家看看產品開發流程會長什麼樣子。

除了產品開發流程以外，這週也會帶大家練習全新的思考模式，並且做一個簡單的前端框架出來，幫以後的學習鋪路。

#### 指定教材

[HW19 作業連結](/homeworks/week19)

#### 自我檢測

- [ ] P1 知道什麼是 Scrum
- [ ] P1 知道 Scrum 中通常會有哪些元素
- [ ] P1 知道什麼是 user story

### 第二十週（10/26 ~ 11/01）：複習週

這是最後一次的複習週了，在前幾週我們同時加強前後端，並且最後帶到產品開發的相關概念，讓大家對整個開發流程又理解更多了一些。

至此，這個課程的基礎跟中階都學完了，從下週開始就要進入到前端框架的領域。

為了怕大家複習週太無聊，這次也準備了一個有趣的小測驗，[Lazy Hackathon](https://lidemy.github.io/lazy-hackathon/) 是一個速度很慢的網站，原因有很多，原始碼在這裡：https://github.com/Lidemy/lazy-hackathon （特別感謝 [@yakim-shu](https://github.com/yakim-shu) 同學製作這個小測驗）

現在呢，你要來負責優化這個網站，在「不動內容」的情形下來調整，意思就是說網頁看起來要「長得一模一樣」，把圖片變黑白、刪減文字或是更動排版都是不允許的，但刪減多餘的 HTML、CSS 和 JS 是 ok 的，只要保證網頁看起來一樣就行了，原始碼怎麼動隨便你，總之目標是使網站的載入速度變快。

詳細說明請參考上面的原始碼連結。

若是你沒有任何靈感，可參考 [web.dev](https://web.dev/) 或是 [Website Performance Optimization](https://www.udacity.com/course/website-performance-optimization--ud884)

[HW20 作業連結](/homeworks/week20)

### 第二十一週（11/02 ~ 11/08）：前端框架（一）

終於要進入到前端框架 React 了（雖然嚴格來說 React 並不是一個框架，但搭配其他各種 React 生態系成員，其實就算是一個框架了）。

這週會學習到 React 的基本應用以及原理，了解為什麼我們需要使用 React。

延伸閱讀：[React 性能優化大挑戰：一次理解 Immutable data 跟 shouldComponentUpdate](https://blog.techbridge.cc/2018/01/05/react-render-optimization/)

指定教材：

1. [FE301] React 基礎：全部
2. 程式導師實驗計畫第二期：Week12-1 React
3. 程式導師實驗計畫第二期：Week12-2 React 續
4. [官方教學](https://reactjs.org/tutorial/tutorial.html)
5. [React.js 小書](http://huziketang.mangojuice.top/books/react/)


[HW21 作業連結](/homeworks/week21/fe)

#### 自我檢測

- [ ] P1 我知道 React 的目的以及原理
- [ ] P1 我知道我們為什麼需要 React
- [ ] P1 我知道使用 React 跟之前使用 jQuery 的區別
- [ ] P1 我理解 state 跟 props 的不同

### 第二十二週（11/09 ~ 11/15）：前端框架（二）

在上一週結束之後，大家應該對 React 有了一些基本的感覺，這一週我們要繼續培養對 React 的感覺，讓大家對 React 越來越熟練。

除此之外也會教大家用 React Router 這一套 library，來實做前端的路由。

指定教材：

1. [FE301] React 基礎：全部
2. 程式導師實驗計畫第二期：Week13-1 還是 React
3. 程式導師實驗計畫第二期：Week13-2 依舊 React

[HW22 作業連結](/homeworks/week22/fe)

延伸閱讀：[前後端分離與 SPA](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/)、[跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR](https://medium.com/@hulitw/introduction-mvc-spa-and-ssr-545c941669e9)

#### 自我檢測

- [ ] 我熟悉 React 的基本使用
- [ ] 我知道如何使用 React Router 
- [ ] 我了解 React Router 的目的
- [ ] 我知道什麼是 Single Page Application
- [ ] 我理解現在的前端與以往的差別

### 第二十三週（11/16 ~ 11/22）：前端框架（三）

在之前的 React 課程中，我們已經慢慢熟悉 React 的思考模式，可是還有一些問題還沒解決，雖然你現在感受不太到，但是在 App 慢慢變大之後就會碰到了。

接續之前的課程，這一週會讓你的 Web App 變得更加完整，會導入一個新的東西：Redux，說明我們為什麼需要它。

指定教材：

1. 程式導師實驗計畫第二期：Week14-1 Redux
2. 程式導師實驗計畫：Lesson 13-1 之 React + Redux

[HW23 作業連結](/homeworks/week23/fe)

#### 自我檢測

- [ ] 我理解 Redux 的目的以及原理
- [ ] 我知道我們為什麼需要 Redux

### 第二十四週（11/23 ~ 11/29）：前端框架（四）

最後一週裡面我們將用 redux 來解決非同步操作的問題，讓大家知道如何利用它與 redux-promise 來解決非同步的一些問題。

指定教材：

1. 第二期 Redux 補充講解：redux-thunk 與 redux-promise
2. 程式導師實驗計畫：Lesson 13-2 之 React + Redux 下
3. 第二期 React 補充：什麼是 super 以及生命週期的運用
4. 第二期 React 補充：再來談談什麼是 this

[HW24 作業連結](/homeworks/week24/fe)

#### 自我檢測

- [ ] 我知道 Redux 如何搭配 middleware 解決非同步操作的問題

### 第二十五週（11/30 ~ 12/06）：Final Project

### 第二十六週（12/07 ~ 12/13）：Final Project


# Final Project

正式的課程就到這邊告一段落了，你學了前端後端與程式相關的基礎知識，接下來需要做一些作品累積經驗，因此接下來幾週都會讓同學做出屬於自己的 Final Project，建議可以與其他人合作，但也可以選擇一個人單打獨鬥。

根據第一期的經驗，其實找人合作會是比較好的選擇（第二期因進度問題沒有 Final Project）。

如果大家一點靈感都沒有的話，可以參考以下幾個提案（但有自己的想法當然是最好的）：

## 留言板

既然我們這次的課程做了這麼多個留言板，不如把留言板給做到極致吧！

你可以做一個「讓大家都能申請留言板」的系統，就像是無名小站那樣，每個人都可以申請帳號，有帳號之後可以開設自己的留言板，然後可以自己選擇要不要開放訪客來留言，不開放的話就預設是只有會員可以留言。

點下去會員的帳號之後還可以看到會員個人資料，或者是直接跳到會員自己的留言板去（如果有的話）。

除此之外，如果你想走前端的話，可以試著把前端改成 SPA 試試看！

## 論壇系統

建立一個論壇系統，能有不同的板塊（討論區），例如說：

1. 閒聊
2. 購物
3. 程式相關主題

在不同板塊底下都可以發表文章，除了發表文章以外，下面也能夠有回覆。

或者是你也可以把板塊當成是 Tag 而已，在同一個頁面就可以看到所有的文章，如果你想找範例的話，可以參考：http://react-china.org/

## 購物網站

做個簡單的購物網站，可以參考任何一家市面上的電商，例如說這個我隨便找的電商：https://www.yuyufarm.com/

重點是除了前端以外，你必須要有後台能夠讓管理者登入，並且管理商品（例如說調整價錢、上傳圖片、調整順序等等），可以先完成一個最簡單的版本，之後再慢慢加強。

## 社交網站

可以直接參考 Twitter：https://twitter.com/?lang=zh-tw

你可以 follow 人，然後就能夠看到他的動態，也可以自己 po 動態，會出現在自己的 follower 的牆上。

總之呢，關於 Final Project，沒有靈感的話可以先從自己常用的東西開始下手，先打造出一個最簡單的版本再慢慢加強。也可以盡量去找一些第三方的 API 來串，增加自己串 API 的經驗，例如說：

1. Firebase
2. Google Map API
3. Google Login, Facebook Login
4. 金流

## 繳交 Final Project

請準備好以下幾個東西並且於第二十七週 po 到 Slack 裡面：

1. 作品網址（沒主機或是 deploy 碰到問題的可以來找我）
2. 5 分鐘以內介紹作品的短片，上傳到 YouTube（可以不用露臉，你不想出聲的話後製加文字也可以）
3. GitHub 網址（請確保你有把一些敏感的資訊例如說資料庫密碼之類的拿掉）
4. 做 final project 的心得（看你想寫在哪裡都可以）

## 自我練習

Codewar 是一個程式解題平台，靠這些題目，可以訓練自己對語法的熟悉度以及維持手感，更進階的題目則是能夠訓練思考邏輯以及解題方法。

我依照難度整理出了一些題目，平常做作業卡關或是沒事做的時候，都可以解一下這些題目。

[Codewar 題目列表](/codewar.md)

## Tech Stack

這邊列舉這堂課程用到的所有工具。

1. 課程直播：YouTube
2. 群組聊天：Slack
3. 交作業：GitHub + GitHub Classroom
4. 練習題目：Codewar + LidemyOJ
