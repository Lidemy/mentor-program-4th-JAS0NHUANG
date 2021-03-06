## 請以自己的話解釋 API 是什麼

應用程式提供給使用者一個交換資料的媒介，讓我們能夠透過提供者所制定的規則對某個網站或程式存取資料、修改資料、刪除資料或者傳送資料。

可以把 API 想像成銀行的 ATM。
我們把錢存在銀行，同時也有很多其它人存在同樣的銀行，所以你要領錢的時候他當然不會直接讓你走進去他的金庫自已拿錢，所以就要有一個「介面」處理這些事情，像是領錢（GET 並 DELETE），查詢餘額（GET）， 修改密碼（PATCH），存錢（POST），金融卡（id認證、token……）……等等。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

- 418 I'm a teapot
  > 418 I'm a teapot用戶端錯誤碼表明了伺服器是個（永久性的）茶壺，所以拒絕煮咖啡。一個結合了咖啡與茶壺的壺子暫時沒咖啡的情境，應該回傳 503。這個錯誤是源自於 1998 與 2014 的愚人節玩笑「超文字咖啡壺控制協定」（Hyper Text Coffee Pot Control Protocol）。  

  這個應該很多人都會介紹，但是真的不介紹不行，太有趣了, 老師還特地寫了篇[文章](https://blog.techbridge.cc/2019/06/15/iam-a-teapot-418/)介紹它阿！  
  它就是一個愚人節的玩笑，但是大家將錯就錯，就變成了一種慣例囉，上 google teapot 倒杯茶喝吧！  


- 511 Network Authentication Required  
  如果我沒有會錯意的話，這個狀態通常是在需要登入使用網路服務的地方出現，就是當我們需要經過一個控制網路連線的 http 代理伺服器傳送 request 時，如果沒有登入，代理伺服器就會回傳這個錯誤。  
  像是在旅館連上 wifi 後，通常會被導向一個網站（伺服器），輸入正確登入訊息後才能連上網路。
- 410 Gone  
  沒了！永遠沒了！我們所 request 的內容在伺服器上永遠不存在了！（但是我有一個問題，這是意味著它曾經存在嗎？或者它從來不曾存在過？或者兩者皆有可能？）

- 202 Accepted  
  伺服器已接受請求，但尚未處理。最終該請求可能會也可能不會被執行，並且可能在處理時被禁止。

資料來源： Wikipedia、MDN

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

Base URL: https://lidemy-restaurant-db.com

說明             | 方法   | 路徑             | 參數                    | 範例
-----------------|--------|------------------|-------------------------|------
獲取所有餐廳資料 | GET    | /restaurants     | _limit:限制回傳資料數量 | /restaurants?_limit=5
獲取單一餐廳資料 | GET    | /restaurants/:id | 無                      | /restaurants/8
刪除餐廳資料     | DELETE | /restaruants/:id | 無                      | 無
新增餐廳資料     | POST   | /restaurants/    |  name: 餐廳名稱         | 無
修改餐廳資料     | PATCH  | /restaurants/:id |  name: 餐廳名稱         | 無 

其實把作業裡書藉資料 API 文件裡所有的 books 換成 restaurants 就差不多了。但是如果是真的要商用的網站，是不是應該還是要加上一個像 Twitch 一樣的 client ID 驗證比較好？    
像是要到 https://dev.lidemy-restaurant-db.com/user 去註冊一個帳號，然後取得 client ID 再用 header 帶上？
