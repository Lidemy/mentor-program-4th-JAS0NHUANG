# 作業筆記

## hw1

看到 request npm 上面說 depricated 就試著用 Axios，後來還是想說用老師教過的套件做一次比較好。  
然後自已寫完後看老師的範例再重寫一次, 主要的修改就是

1. 把錯誤處理放到前面
2. 把 JSON.parse 包進 try catch 裡面，避免讀入的資料有誤

還沒有去查 axios 如果遇到 data 不是 JSON 格式的資料時應該如何處理。

## hw2

本來直接就用 if 寫出來，但是看過範例後，真的是用 switch 寫比較清楚，所以就改過來了。

## hw3

看範例才想到要加 if(!process.argv[2]) 這個判斷。  
加在函式外面也可以運作，但是 eslint 會報錯……（return ousite of function）

## hw4

Twitch API V5 串接還算簡單，只是比之前其它作業多了需要設定 header 裡面 accept、Client-ID 參數的部分。把他們用 config 檔一起帶到 request 裡面就好了。

## 挑戰題 New Twitch API 串接

twitch 的新 api 串接真的非常的不友善阿！！  
除了 V5 要用到的 client ID 之外，還多了一個 client secret 跟一個 OAuthToken，三倍麻煩。  
[文件](https://dev.twitch.tv/docs/api)也寫的讓人看完差不多等於沒看（或者其實就是自已太嫩，看不懂……）    

在試過幾種排列組合之後總算是拿到了金鑰可以抓資料了。  
但是它不給一次抓 200 筆資料，甚至設定為上限 100 筆他還不會乖乖的就剛好給你 100 筆，總是會少個四、五、六筆資料（原因是什麼有解答嗎？），所以 200 筆資料就要至少分 3 次抓，所以這裡就想到了可以用 CALL 自已的解法。  
任務也算是達成了？！就是程式碼可能還是拜託老師、助教打掃一下了。

## 超級挑戰題

應該可以算是查資料、看資料挑戰……  
[Making POST Requests in Node.JS](https://usefulangle.com/post/167/nodejs-post-request) 跟 [How to make HTTP Requests in native Node.js](https://attacomsian.com/blog/node-make-http-requests) 這兩篇文章算是比較清楚的。  
本來在處裡 querey string 的時候找不太到方法，然後就用了一些網路資料上用的 querystring 這個套件，後來想說不對阿，這應該不是太難的事情吧？  
把 querystring 套件處理過的資料 console.log 出來看了一下，就只是把 JSON 格式的內容轉成 query string 的 'XXX=YYY' 格式而已，所以乾脆自已寫就好了……少用一個套件！同時也想到之前 left-pad 的故事 XD  
因為 get 用起來算是蠻簡單的，所以第一次試做的時候兩個單純抓資料的部分很快就完成了，但是 post、patch 除了 node 官網之外，在網路上不是太好找資料，剛開始也看不太懂 node 官網的範例程式碼，那個 chunk 是什麼，到底要怎樣 parse 資料，錯誤應該怎麼處理，不同的方法之間有哪些部分可以共用？  
總之，最後是把題目要求的功能寫出來了，其中用了兩次 switch 感覺還是不太好，但是實在是想不太到其它解法，而且既然是挑戰提，就先完成挑戰就好了吧！

## 變數命名問題

不知道命名為 API_ENDPOINT 的原因為何？（上網查不太到……）  
也看了老師推薦的文章：[JavaScript 开发规范（一）： 命名与注释规范详解](https://juejin.im/entry/599d433cf265da24797b5c66)，依照文章裡的說法，是不是所有的 const 都應該變成全大寫 snake cased？  
文章裡也有提到之前第三週作業老師提到的函式命名問題。  
