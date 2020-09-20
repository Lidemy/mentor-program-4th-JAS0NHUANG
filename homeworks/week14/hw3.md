## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
Domain Name System 中文翻譯為「網域名稱系統」，其實它就是一個「**IP 位址 / 域名（Domain Name）電話簿**」，它的主要工作是：「將使用者傳給它的域名翻譯成 IP 位址，然後把 IP 位址回傳給使用者。」工作聽起來很簡單，但是背後的科技與實作還是很複雜的。  
除了硬體技術之外，光是討論 DNS 伺服器裡面儲存的「記錄類型」就有分成 A、AAAA、CNAME、SOA、PTR、BS、MX……等等，對於前端工程師來說，現階段能夠大略理解 DNS 的工作模式，知道如何在自已購買的網域服務上設定 A 類型記錄（ipv4 位址）、CNAME、NS 等幾個基本項目應該是足夠了。  

Google 提供公開的 DNS 當然不是佛心來著，身為目前世界最大的搜尋引擎（近十年市佔率穩定保持 90% 左右[Worldwide desktop market share of leading search engines from January 2010 to July 2020 ](https://www.statista.com/statistics/216573/worldwide-market-share-of-search-engines/)），越多人使用它的 DNS 服務，它所搜集到的用戶網路足跡就越完整，如果將這些資料與搜尋引擎搜集到的資料整合起來，可以說使用者在網路上的行為模式就無所遁形了，這些**搜集到的「資料」就成為 Google 在商業上最大的競爭力**。  
承上，所有人的上網記錄都可在通過 DNS 時被記錄下來，而 Google 在面對美國政府壓力時似乎往往會選擇妥協（訊息來源？），雖然美國是一個有基本法治的國家，較不至於有人權上的疑慮，但是這仍然**可能侵犯到用戶的穩私**（在用戶有意識或無意識同意的狀況下）。  

對用戶來說，因為 Google 掌握了相對完整的域名/ip 的對應資料，所以在大部分的情況下直接訪問 Google 的 DNS 伺服器都可以找到域名/ip 資訊，並且取得最新最正確的資料，所以**速度相較於各地 ISP 的 DNS 可能會快一些**。   
因為 Google 在世界各地都有伺服器，所以**比較不容易故障，服務穩定**。 
在信任 Google 安全性的前題之下，可以**避免 ISP 搜集個人上網資料**。

參考資料
[Wikipedia - Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System#Structure)  
[使用 Google Public DNS 服務，上網速度不一定會變快！](https://blog.miniasp.com/post/2009/12/08/Use-Google-Public-DNS-may-not-surfing-faster-as-you-expected)  
[還在 Google DNS 8.8.8.8？更安全好用的「1.1.1.1」讓臉書不卡卡](https://www.vedfolnir.com/world-best-dns-1111-rather-than-8888-and-hinet-dns-29245.html)（似乎更安全的 DNS 選擇。）  

## 什麼是資料庫的 lock？為什麼我們需要 lock？
Lock 就是當我們**對資料庫進行操作時，可以把處理中的數據、資料「鎖」住，避免資料庫在處理請求的同時被其它的操作干擾**。  
如果沒有 lock 的話，進行操作時可能會產生無法預期的結果，進而造成資料錯誤，如兩個人同時購買一個只剩下一件的產品，因為沒有 lock 所以 A 購買時 B 同時也可以購買，資料庫同時處理這兩個請求就會造成超賣的狀況。  
查了一下 MySQL 與 Microsoft SQL Server 的文件，發現 locking 可以分成好多個層級（一個列、一個表格、整個資料庫……等等），還有不同類型的講究（共用鎖定、獨佔鎖定、更新鎖定……等等），應該也是對應到不同使用情景再選擇應該如何使用 lock，以後有機會再深入研究了。  

[【轉貼】淺談SQL Server的鎖定原理](https://cbw0731.pixnet.net/blog/post/5143648)
[MySQL - 15.7.1 InnoDB Locking](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html)
[SQL Server - 鎖定類型介紹](http://caryhsu.blogspot.com/2011/09/sql-server.html)  
[Record locking](https://en.wikipedia.org/wiki/Record_locking)  
[Database Locking: What it is, Why it Matters and What to do About it](https://www.methodsandtools.com/archive/archive.php?id=83)  
[What is a database lock in the context of SQL? Provide an example and explanation](https://www.programmerinterview.com/database-sql/database-locking/)
[DB Locks in SQL](https://www.tutorialcup.com/interview/sql-interview-questions/db-locks.htm)

## NoSQL 跟 SQL 的差別在哪裡？
這個名稱最初好像真的是 "non-SQL" 或 "non-relational" 的意思，現在普遍被解讀為「Not only SQL」應該是因為它其實並不能真的取代關聯式資料庫，在很多場景下可能不適用，所以因應使用場景的不同（像是儲存大量無結構性的資料時）可以是關聯式資料庫之外的另一種選擇。  
NoSQL 與 SQL（或 RDBMS，下面講到以 SQL 為基礎的資料庫系統會改稱 RDBMS，感覺比較精確一些）因為以下幾個主要的差異讓他們各有適用的場景：
1. NoSQL 儲存結構比較鬆散，單純存入資料，而 RDBMS 有明確的 Schema 結構。
2. NoSQL 可以用 JSON 格式（key-value）來儲存資料。（其它型態的資料應該也可以？如最後一個參考影片所提到的。）
3. NoSQL 不支援 Join 與 ACID（但是 Wikipedia 的條目上卻說不同 NoSQL 資料庫對兩者有不同程度的支援，依照各資料庫系統自已文件的「聲稱」列表，所以應該可以把它們看做「不完整支援」？或者因為它們的支援其實都只是替代方案（workaround），所以不算是原生支援？）
4. NoSQL 的資料安全性與正確性不如 RDBMS。
5. NoSQL 有較好的擴展性（scalability）。
6. NoSQL 是透過「物件為基礎」的 API 與程式串連，RDBMS 則必需使用 SQL 這個語言與程式串連。

參考資料：  
[NOSQL](https://hostingdata.co.uk/nosql-database/)
[NoSQL - Wikipedia](https://en.wikipedia.org/wiki/NoSQL)  
[AWS - 什麼是 NoSQL？](https://aws.amazon.com/tw/nosql/)
[Getting Started with NoSQL](https://www.youtube.com/watch?v=MBODF1Vru2Y)
[Databases on AWS: The Right Tool for the Right Job](https://www.youtube.com/watch?v=-pb-DkD6cWg)（這部影片提到 SQL 與 NoSQL 已經不太能清楚說明現在資料庫使用的情況，講者提出的是對應不同場景有不同型態的資料庫，像是 Relational、Key-value、Graph……等等。）  


## 資料庫的 ACID 是什麼？
是資料庫在進行交易（transaction）操作時，為了保證交易正確所必需符合的幾個特性：

- Atomicity
  通常譯為「原子性」，也可以翻譯為「不可分割性」，個人認為「不可分割性」雖然比較冗長，可是相較「原子性」更易於理解、更清楚的表達它的特性，所以其實我覺得英文原文也是有點為了簡化、漂亮的名詞而取名的感覺……好像執著於命名也沒什麼實質意義，能夠溝通就好了。  
  總之，在進行交易性質的操作時，必需要「**確保所有修改都被執行，或是都不被執行**」，這就是交易的「原子性」/ 「不可分割性」。


- Consistency
  「一致性」，也就是**交易前後的資料狀態不能破壞程式或資料庫的各項約束**（資料完整性、業務邏輯限制……等等。  
  老師在課程裡所提到的轉帳交易後兩方存款總額不變應該屬於銀行業務的邏輯限制，除此之外還有關於交易的準確性、合法性，關於回滾機制（rollback，當交易失敗時資料回復的狀態），關於觸發器……等等的限制與定義，都屬於「一致性」必需保證的範圍。（看了一些資料，很多理論內容還是沒有非常清楚，只是大概將所讀到的概念表達出來。）  

- Isolation
  「隔離性」，在進行一個交易操作時將資料「隔離」來起，讓該交易不被其它操作影響，也就是上面所提到 lock 需要被應用的地方，**當一個數值正在進行「交易」行為時禁止其它操作對同一個數值進行修改（甚至禁止讀取）**。

- Durability
  「持久性」，在一個**交易完成後，不論成功與否，其結果都會被寫入資料庫中，並且保證之後還能夠被存取**（就算系統重新啟動）。（我們之前在寫入資料庫的時候也都有符合這個特性阿！我自已的理解是，會把這個特性特別寫在交易的必要條件裡，應該是意味著有些資料庫資料是被存在記憶體裡面，系統關機之後就會消失？）

參考資料：  
  [ACID - Wikipedia](https://en.wikipedia.org/wiki/ACID)  
  [Microsoft SQL 文件 - 交易鎖定與資料列版本設定指南](https://docs.microsoft.com/zh-tw/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide?view=sql-server-ver15)
  [MySQL - 15.2 InnoDB and the ACID Model](https://dev.mysql.com/doc/refman/8.0/en/mysql-acid.html)  

其它參考資料：  
  課程影片  
  [程式導師實驗計畫第三期 - 交作業專用 repo - Week14](https://github.com/Lidemy/homeworks-3rd/issues?q=WEEK14)  
  [RDBMS 課程（先修課）](https://github.com/TritonHo/slides/blob/master/Taipei%202018-06%20talk/lesson0.pdf)