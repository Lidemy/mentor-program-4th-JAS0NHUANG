## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

加密（encryption）與雜湊（hash）表面上看起來最大的差異在於是否具有可逆性，實際上，兩者**可以說是完全不一樣的兩種技術**，使用的流程與適用場景也完全不同。

### 加密
- 原理：  
加密要先設定好一個金鑰，然後再將資料透過加密演算法以及設定好的金鑰生成一個加密後資料，只要取得金鑰的人就可以將資料解密從而取得加密前的資料內容。  

- 使用流程（一般檔案加密、解密）：  
  ```
  使用者原始資料 --> 設定金鑰 --> 加密演算法 --> 加密後資料 （加密）  
  加密後資料 --> 使用金鑰 --> 解密 --> 使用者原始資料 （解密）  
  ```

- 破解方式與其它：  
除了暴力破解，只要試著取得金鑰就可以將檔案解密。  
加密還有分對稱式與非對稱式，對稱式只會有一個金鑰，非對稱式則會有公鑰、私鑰，對稱式加密法只要金鑰被中間人偷走就沒救了，但是非對稱式加密除非本地的私鑰也被偷走，不然中間人只有公鑰也沒辦法解密。  


### 雜湊
- 原理：  
雜湊則是將原始資料運用雜湊演算法產生一個雜湊值，這個雜湊值是沒有辦法經過任何方法還原回原始資料的，但是只要資料內容一致，那每次算出的雜湊值將會一致，所以很適合用來處理密碼儲存與驗證、檔案內容驗證。也因為雜湊無法還原的特性，**所以密碼在存入資料庫時最好是「一律」經過雜湊，如此可以有效避免資料外泄時密碼被竊取的風險**。  

- 使用流程（處理密碼儲存與驗證）：  
  ```
  使用者輸入密碼 --> 雜湊演算法 --> 產生雜湊值 --> 儲存雜湊值 （設定密碼）  
  使用者輸入密碼 --> 雜湊演算法 --> 產生雜湊值 --> 比對資料庫中的雜湊值與輸入的雜湊值是否相同 （驗證密碼）
  ```

- 破解方式與其它：  
基本上除了暴力破解沒有其它的破解方法（在演算法沒有被破解的前題下）。雜湊演算法對於太簡單的密碼同樣沒有辦法有效防犯破解，有心人士如果使用彩虹表可以輕易破解不夠安全的密碼（太短、常用字串……等等），但是彩虹表其實也算是暴力破解的一種。  
因為雜湊是無限（輸入值可以有無限可能）對有限（以 php 使用的 bcrypt 為例，會是一組有限的 64 個字元亂數），所以有碰撞的可能（不同輸入值產生相同雜湊值），但是好的演算法可以讓碰撞的機率降到機乎可以忽略的程度。

## `include`、`require`、`include_once`、`require_once` 的差別

### include 與 require  
在 php require 的官方文件（[php - Documentation - require](https://www.php.net/manual/en/function.require.php)）有這麼一段：  
> require is identical to include except upon failure it will also produce a fatal E_COMPILE_ERROR level error. In other words, it will halt the script whereas include only emits a warning (E_WARNING) which allows the script to continue.   

大意就是 require 與 include 除了載入失敗之後的行為不同之外，可以看成是相同的功能。  
用英文單詞的意思來理解它的不同應該是比較好記憶的方法：require = 需要；有賴於；要求；規定； include = 包含；包括 （[Cambridge Dictionary](https://dictionary.cambridge.org/)），所以使用 require 的時候，如果載入失敗會出現 E_COMPILE_ERROR，然後程式碼就無法繼續執行，因為它是「要求」、「規定」；但是使用 include 時，如果載入失敗只會出現 E_WARNING，並且不影響程式繼續執行，因為只是「包含」、「包括」沒有包含到的話也沒關係。  

### 有或沒有 _once
再來看一下官方文件（[php - Documentation - include_once](https://www.php.net/manual/en/function.include-once.php)）：
> …behavior similar to the include statement, with the only difference being that if the code from a file has already been included, it will not be included again, and include_once returns TRUE. As the name suggests, the file will be included just once. 

所以 include_once(require_once) 與 include(require) 也是只有一個不同：include_once(require_once) 只會載入一次所要求的檔案（就算同一個檔案試圖要求多次），include(require) 在每次要求時都會重新載入一次。

大概整理一下：  
|      | require                        | include
|------|--------------------------------|--------------------------------
|      | 可載入多次，載入失敗會出現錯誤 | 可載入多次，載入失敗只出現警告
| once | 只載入一次，載入失敗會出現錯誤 | 只載入一次，載入失敗只出現警告

瞭解這些差異之後，也比較清楚為什麼課程裡都是使用 require_once 了：只在真正需要的地方引入，並且只引入一次！

## 請說明 SQL Injection 的攻擊原理以及防範方法
SQL Injection 的攻擊原理就是利用修改 SQL Query 的方法，讓資料庫執行攻擊型的 SQL Query，進而取得、更動資料庫裡的資料。  
雖然有使用者輸入的欄位是主要攻擊的切入點（只要輸入奇怪的內容就可以輕易取得攻擊想要的效果），但是其實所有在程式裡使用到 SQL Query 的地方都是潛在的漏洞，因為攻擊者在找出程式的某些規則之後（像是如何處理 request、如何下 SQL Query）也可以繞過前端直接對後端傳送 request 並且注入攻擊用的 SQL Query。  

- 防範的方法：
使用 Prepared Statement ，將所有 SQL Query 都先經過 Prepared Statement 處理，這樣使用者（攻擊者）所注入的攻擊性內容就不會被解析為程式碼的一部分也就不會被資料庫執行了。

##  請說明 XSS 的攻擊原理以及防範方法
XSS 全名為 Cross-site Scripting，直譯為中文是「跨網站指令碼」，最初確實是因為瀏覽器還沒有同源政策的狀況下攻擊者可以「跨網站」執行指令碼，並且進行惡意攻擊（取得資料、更動資料……等等），但是在瀏覽器都有同源政策保護的狀態下，我自已覺得現在的 XSS 攻擊主要已經不是「跨網站」的攻擊了，反而比較像是上面講到的 SQL Injection 的型式，也就是另一種型式的「注入」，只是程式碼從 SQL 變成 JavaScript（或其它可以在 HTML 裡執行的指令）。  

XSS 攻擊可以分為以下幾個種類，下面只大略提一下，細節真的很複雜，還可以有各種花式組合（XSS 搭配 CSRF ……等等），要詳細解釋的話大概可以寫一篇論文了。  
儲存型（將惡意程式碼注入資料庫）、反射型、DOM 型（反射型與 DOM 型主要都是透過網址列傳入惡意程式碼）、Self-XSS（需要搭配社會工程方法，感覺比較算是詐騙了）、變化型。

- 防範的方法：
最常見的就是在顯示所有使用者輸入的資料時都經過跳脫字元的處理，php 可以使用內建的 htmlspecialchars() 函式，JavaScript 則可以自已寫一個 escape() 函式。

[Wikipedia - Same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy)
[Wikipedia - XSS](https://en.wikipedia.org/wiki/Cross-site_scripting)

## 請說明 CSRF 的攻擊原理以及防範方法
英文全名為 Cross Site Request Forgery，與 XSS 不同，不是在網站植入指令碼（程式碼）的方式進行攻擊，而是在可以利用的地方隱藏可以發出合法的 request 內容,搭配使用者原來就有的合法 cookie，使用者如果沒有注意而開啟或是點擊相關的元素時就會執行攻擊者想要進行的攻擊，嚴格來說比較像是釣魚或是詐騙。

- 防範的方法：
1. 圖形、簡訊驗證  
最有效的方法，對於真正重要的資訊可以這樣處理（像是銀行轉帳、機密文件處理……等等），但是對於不那麼重要的資訊（如刪除留言、修改文章……等等）就會讓使用者感到很困擾。  

2. 驗證 header 裡的 referer  
用來確認使用者傳送 request 時是在同一個域名之下，但是有幾個缺點：  
  - 瀏覽器可能不會帶 referer
  - 有些使用者可能會關閉自動帶 referer 的這個功能
  - 判定是不是合法 domain 的程式碼必須要保證沒有 bug
  - 無法保證瀏覽器沒有其它安全漏洞（或被攻擊）而影響到這 referer 的內容

3. CSRF token  
伺服器端產生一個 token 存在表單與伺服器中，然後在接到客戶端的 request 時除了身份驗證外同時驗證這個 token 是否正確。但是如果網站支持 cross origin 的 request，攻擊者就可以在他的頁面發起一個 request，順利拿到這個 token 並且進行攻擊。所以也不是很完美的解決方案。  

4. Double Submit Cookie  
可以是**伺服器或客戶端**產生一個 token 並加在 form 裡面，然後在客戶端設定一個存 CSRF token 的 cookie，這樣伺服器接到 request 時透過比對 form 與 cookie 裡的 token 就可以確認是否為使用者自已發出的 request。  

5. 設定 SameSite cookie  
在設定 session cookie 的時候加上 SameSite，這樣我們所設定的 session cookie 就只有在同網域的 request 下才會生效了。依照所查到的資料（[php - documentation - session-set-cookie-params](https://www.php.net/manual/en/function.session-set-cookie-params.php)），php 可以透過 .ini 設定檔設定 SameSite 為 strict、lax 或 none，也可以在 start_session() 之前自已手動設定 [How to tell PHP to use SameSite=None for cross-site cookies?](https://stackoverflow.com/questions/59534999/how-to-tell-php-to-use-samesite-none-for-cross-site-cookies)
