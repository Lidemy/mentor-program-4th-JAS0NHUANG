## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
TEXT 很清楚的說明它的型態就是「文字」，而 VARCHAR 則是 CHARACTER VARYING 的縮寫。

兩者的相同點：
1. 都屬於 string（字串）資料型態。
2. 最大長度皆為 65535 個字元，如果有多位元字符（multibyte character）的話長度可能會不足 65535。

兩者不同點：
1. VARCHAR 可以設定一個最大長度，TEXT 不行。  
  （但是在文件裡有提到：An optional length M can be given for this type. If this is done, MariaDB creates the column as the smallest TEXT type large enough to hold values M characters long. 不是很清楚這裡所表達的是什麼意思……）  
2. 建立索引時，VARCHAR 可以不必設定前綴（prefix，也就是不必設定加入索引的長度），但是 TEXT 一定要設定一個前綴  
  （For indexes on BLOB and TEXT columns, you must specify an index prefix length. For CHAR and VARCHAR, a prefix length is optional. 因為還沒有學到 index，所以這部分並沒有真的非常清楚。）  

其它：
1. 很多地方都有提到 TEXT 不能設定預設值， MySQL 的官方文件也是這麼寫的，但是在 MariaDB 的[這份文件裡（BLOB and TEXT Data Types）](https://mariadb.com/kb/en/blob-and-text-data-types/)說在 MariaDB 10.2.1 版本之後，TEXT 已經可以被賦與預設值了。

參考資料：  
[MySQL - 11.3.1 String Data Type Syntax](https://dev.mysql.com/doc/refman/8.0/en/string-type-syntax.html)  
[MySQL - 11.3.2 The CHAR and VARCHAR Types](https://dev.mysql.com/doc/refman/8.0/en/char.html)  
[MySQL - 11.3.4 The BLOB and TEXT Types](https://dev.mysql.com/doc/refman/8.0/en/blob.html)  
[MariaDB - BLOB and TEXT Data Types](https://mariadb.com/kb/en/blob-and-text-data-types/)  

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

Cookie 的出現是為了解決 HTTP 協定的無狀態問題（statless）所產生出來的一種解決方案。雖然它常常被運用在設定 session 的場景，但是其實它可以應用的範圍很廣泛，不止限於 session。   
首先，我們知道 HTTP 這個協定無狀態的特性，也就是說每一次的連線（request、response）都像是一次全新的體驗！每一次的相遇，瀏覽器、伺服器都是不認識對方的，這個特性會造成一些互動上的不便，像是伺服器沒辦法記住使用者是不是已經登入的問題，或者使用者不小心重整頁面之前的資料就都消失的問題。  

有了 cookie 之後，伺服器就可以在回傳的 response 裡請求瀏覽器設定一個 cookie，然後從此之後，瀏覽器在發送 request 的時候就會帶著那個 cookie，不論裡面的資料是購物車裡選擇的商品還是用戶的識別證，總之，伺服器就可以得到它所需要關於使用者的資訊了。  

如上所述，設定 Cookie 的工作是由後端伺服器負責的，像是課程裡教到的用 php setcookie()，當伺服器接收到瀏覽器發出的請求，藉由這個函式就可以在 response 的 header 裡面要求設定一個 cookie，進而將 cookie 資料儲存到瀏覽器指定的位置（我目前只知道每個瀏覽器儲存 cookie 的方式有一些差異，細節還不是很清楚）。  
瀏覽器在 request 裡會自動把屬於該網域的 cookie 傳給伺服器，除非使用者手動把 cookie 刪除，或者在瀏覽器裡進行一些特殊設定，不然瀏覽器就會自動將 cookie 連同 request 帶給伺服器。  

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

1. 明碼儲存的密碼，只要資料庫被入侵所有的敏感資料就都外泄了。
2. 沒有要求密碼的基本複雜度，使用者可能會輸入太過簡單的密碼。
3. 在課程示範的影片中，所有的使用者輸入欄位都沒有特別處理 HTML 特殊字元（如：<、>、' ...等等），所以使用者可以在網頁裡插入程式碼或其它內容。
4. 在新增留言時沒有一個檢查機制，所以使用者可以藉由清掉 COOKIE 來發佈沒有使用者資訊的留言。
5. 如果 COOKIE 資料被竊取，是不是就可以直接偽裝為該使用者？
6. error code 用 GET 方法帶到網址裡，感覺怪怪的，但是還想不到會產生什麼漏洞。
7. 因為自已實作了一次 token 機制，也感謝 cwc329 同學跑來測試，在處理完各種相關問題之後（登出刪除 token，如果某 id 沒有登出，那麼同 id 登入時刪除其舊有 token，在使用新增、刪除、修改留言的功能時驗證 token 的真偽……等等），換成 php 內建的 session 機制真的超級輕鬆的，也不會感覺到很抽像，反而會有一種「什麼都已經幫我處理好」的感覺。
