# 網站部署心得
## 第一次嘗試 - Ubuntu LAMP 留言板成功部署
**AWS EC2 + Ubuntu + LAMP + AWS Route 53 + Freenom(.tk)**

一邊寫 13 週作業的時候就一邊開始試著部署，申請 AWS 帳號不算困難，之前也用過 EC2 建立虛擬主機（沒有用過的人真的會直接迷失在 AWS 的服務海裡），從遠端 SSH 進入虛擬 Ubuntu 主機、在虛擬主機上安裝 LAMP 系統、設定好 MySQL 資料庫、安裝 PHP、Apache 並且將 LAMP 的服務跑起來，上傳 PHP 檔到 apache 伺服器的網站根目錄裡……這些好像也都不是很難，但是居然在設定域名到 ipv4 位址上的時候卡了一下。  
本來以為在 Freenom 管理域名的後台設定好一個 A 類型的記錄就可以了，但等了一陣子一直沒有生效（大概也就不到一個小時吧，好像真的太急了……），就想說是不是需要其它的設定，上網查了一下資料發現很多文章的教學都是要再到 AWS Route 53 申請一個 hosted zone（托管區域），create record（新增記錄），然後再回到 Freenom 後台把 Route 53 裡面的 namespace 抓過來，設定好才順利完成域名綁定。  
後來發現，好像其實只要到 Freenom 設定好 ipv4 的記錄就可以了，可能要稍微多等一段時間吧？！ 
Freenom 提供了一些免費域名註冊，但是也因為這些域名是免費的，所以常常被濫用，像 .tk 就是一個很「黑」的域名。  
[.tk - Wkipedia](https://zh.wikipedia.org/zh-tw/.tk)
試過 Route 53 之後還是不太瞭解它服務的細節以及定位，還多花了半杯咖啡的錢……之後有機會接觸到再仔細研究了。  
順利部署了留言板，本來就想說是在練習，所以也沒有把它留下來，開始第二次嘗試時就把這個「實例」刪除了。

## 第二次嘗試 - Ubuntu Docker LEMP 設定失敗
**AWS EC2 + Ubuntu + Docker + LEMP**

一直對 Docker 蠻有興趣的，所以就想說可以試試看用 Docker 部署，因為 Apache 安裝、設定沒有遇到問題，就想說順便挑戰看看用 Nginx 部署吧！  
Docker 其實在網路上有不少教學，找了幾個建立 LEMP stack 的教學，一步步跟著做，安裝 Docker，分別下載 Nginx、PHP、MySQL 三個 image、啟動 container 都沒有什麼問題，但是就是卡在 Nginx 的一些設定，一直沒辦法成功抓到自已建立的 php 檔案，一直 Google、一直亂試（真的是亂試……我都不記得試過些什麼東西了，也沒有記錄下來。）最後還是沒有成功，大半天的時間花在上面，好像有點久，所以就先跳過，決定之後有空再試。  

## 第三次嘗試 - Red Hat LEMP 成功部署
**AWS EC2 + RHEL + LEMP + Gandi(.tw)**

在試著用 Docker 部署的時候也嘗試過直接在遠端主機上裝 LEMP，用 LEMP 部署，當時也是一樣卡在沒辦法讓 Nginx 抓到自已建立的 php，想說應該沒道理搞不定阿！所以就又開了一台 EC2 主機試試看。  
這次把 Ubuntu 換成 Red Hat 系統，實際上沒什麼差別，至少現階段用到的功能都一樣，最大的差異大概就是把 APT 換成 DNF(YUM) 來管理軟體而已。  
跟著這個簡單又清楚的教學，[How to Install Nginx, MySQL/MariaDB and PHP on RHEL 8](https://www.tecmint.com/install-nginx-mysql-php-on-rhel-8/)，把 Nginx、PHP、MySQL/MariaDB 安裝好，啟動三個服務，把寫好的 php 檔抓到 Nginx 預設的 `/usr/share/nginx/html/` 資料夾裡，這次就沒有嘗試把資料夾換到別的位置了，全部用預設的設定，順利讓網站跑起來！  
在遠端主機上設定好資料庫，建好表格，然後用 FileZilla SFTP（SSH File Transfer Protocol）連上遠端主機，修改一下 conn.php，把陽春部落格與 T0D0 List 的檔案全部傳上去（跟 mentor-program.co 比起來真的是光速阿 XD），做了一個超級簡陋的首頁導向兩個專案。
跟助教要了乾爹的折扣碼，申請好 JAS0NHUANG.tw 域名，gandi 的後台感覺比較清楚，設定好 DNS 記錄之後就可以用 JAS0NHUANG.tw 連到自已的網站了。

## 第四次嘗試 - Ubuntu Docker LEMP 成功部署
**AWS EC2 + Ubuntu + Docker(compose) + LEMP + Gandi(.tw)**

又過了一兩天，課程看一看，簡答題寫一寫，再試一下 Docker 吧！  
同樣先從網路找資料開始，大部分的教學都是在 Ubuntu 系統上，為了避免在 Red Hat 上出現一些自已沒辦法處理的錯誤，所以還是跟著教學文章用 Ubuntu 好了。  
這次決定跟著這篇教學做一遍：[Docker for local web development, part 1: a basic LEMP stack](https://tech.osteel.me/posts/docker-for-local-web-development-part-1-a-basic-lemp-stack#domain-name)，選擇這一篇文章的原因是因為它每一步安裝、設定都會有很清楚的解釋，不會讓讀者覺得只是把程式碼複製、貼上而已，另外它是一個系列文章，後面還有提到縮小映像檔（image）大小、部署框架、HTTPS……等等，感覺很有系統的帶著讀者實作整個網站的部署，雖然目前只用的到 Part 1 但是未來如果有需要就可以循著它的脈絡繼續。
很多教學文章裡都會用到 [Docker compose](https://docs.docker.com/compose/)（一個幫助執行多個 Docker 容器的工具），這篇文章也不例外，所以有關 Docker 的設定值都會寫在 `docker-compost.yml` 這個檔案裡面，然後只要在這個檔案的資料夾內下 `docker-compose up -d` 的指令，它就會自動幫我們下載映像檔，啟動 Docker 容器，然後按照我們所作的設定處理各容器間的相依性。  
心得裡就不把部署的細節一步步寫出來了，之後再試著寫一篇簡單的文章記錄一下吧！總之最後成功用 Docker 部署網站，應該還有很多細節要再處理，目前先完成「跑的動」這個目標就好了。:D

下面還是列出幾個過程中遇到的問題：

- 首先要注意的是 docker-compose.yml 檔裡面的縮排很重要，它會決定寫上去的東西是屬於那一個項目，所以只要有縮排錯誤 docker-compse 啟動時就會報錯。  
- 因為在課程裡學到的是用 mysqli 連接 MySQL 資料庫，所以這裡就沒有按照文章裡教的安裝 pdo_mysql，而是安裝 mysqli；第一次連接 MySQL 資料庫好像 mysqli 有出錯，找到的資料（[How do you get php-mysql extensions installed for php:7-fpm-alpine](https://github.com/docker-library/php/issues/279#issuecomment-236441847)）說可以在 php 的 Dockerfile 裡面加上 `RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli` 這樣在 Build php 容器的時候就會安裝並且啟動 mysqli 這個套件。  
- 解決新增使用者沒辦法連線資料庫的問題：[Cannot connect to mysql database: Access denied](https://github.com/docker-library/mysql/issues/51)

其它參考：  
[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
[Creating a LEMP architecture with Docker](https://www.moulin-mael.fr/creating-a-lemp-architecture-with-docker/)
[利用 Docker Compose 管理多個容器](https://www.coderbridge.com/@Jemmy1234/6d48f03f39284fe98ae9808f1243ef98)
[Docker Compose 建置 Web service 起步走入門教學](https://blog.techbridge.cc/2018/09/07/docker-compose-tutorial-intro/)
