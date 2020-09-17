# 用 Docker 在 AWS EC2 上部署 LEMP 網站
## 開始之前
因為申請 AWS 帳號、啟動 AWS EC2 主機、用 SSH 連線到主機上進行操作、開啟遠端 80 port……等等工作已經有學長、助教寫的超詳細教學，所以這一篇小小的筆記就只是一個照著網路上教學，在 AWS EC2 上用 Docker 部署 LEMP 網站的筆記。  
因為是用 Nginx 做為伺服器，所以最好是已經有試著不透過 Docker 在 EC2 主機上成功部署 LEMP 的人看，沒有試過的話應該也 OK，只是 Nginx 相關的設定可能會比較不清楚就是了。
另外，筆記裡也不會介紹 Docker 是什麼，所以最好是對 Docker 的基本原理有一點理解，才會比較清楚這篇筆記在說什麼。

## 開始
### 1. 安裝 Docker Engine
  先在 AWS EC2 遠端主機上更新軟體庫並且升級軟體：
  ```
  sudo apt update
  sudo apt upgrade
  ```
  這篇筆記用的 EC2 Linux 版本是 Ubuntu 20.04 LTS 版。

  照著官方文件[安裝 Docker Engine](https://docs.docker.com/engine/install/ubuntu/)，選擇 [Install using the repository](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)
  `sudo docker hello-world` 如果可以正常運作那 Docker 的安裝就順利完成了。  

### 2. 安裝 Docker Compose
  選擇 Linux 系統的安裝指引 [Install Compose on Linux Systems](https://docs.docker.com/compose/install/#install-compose-on-linux-systems)，其實就是下載 Docker Compose 執行檔到 EC2 主機的  `/usr/local/bin` 資料夾裡面，然後讓它可以被當成應用程式執行。  
  執行指令： `sudo docker-compose --version` 如果成功顯示版本號就是成功安裝了。

**接下來的內容主要都是跟著[這篇教學](https://tech.osteel.me/posts/docker-for-local-web-development-part-1-a-basic-lemp-stack)一步一步完成**

### 3. 需要哪些容器？
LEMP stack 用到的就是 Linux、Nginx、PHP 與 MySQL，Linux 是我們正在操作的作業系統，所以需要的容器就是 Nginx、PHP 以及 MySQL。
其中比較特別的是 PHP 服務會使用 PHP-FPM，關於 FPM 是什麼可以參考下面附上的一些文章，我自已只稍稍看了一下，還沒有真的很瞭解其中的細節。  
[PHP 的 Web 運行原理 ( 1 ) - 傳統型](https://mark-lin.com/posts/20190131/)  
[nginx 與 php-fpm 運作介紹與設定](https://tec.xenby.com/20-nginx-%E8%88%87-php-fpm-%E9%81%8B%E4%BD%9C%E4%BB%8B%E7%B4%B9%E8%88%87%E8%A8%AD%E5%AE%9A%E8%AC%9B%E8%A7%A3)  
[全面了解CGI、FastCGI、PHP-FPM](https://codingnote.cc/zh-tw/p/24796)

### 4. 使用 Docker Compose 管理多容器
Docker Compose 最主要的元素就是 docker-compose.yml 檔案，可以看成是 Docker Compose 的入口點。  
我們會在這個檔案裡加入想讓 Docker Compose 執行的相關設定（使用的服務、映像檔名稱、port 設定……等等）
這裡還要提醒一下，docker-compose.yml 這個檔案（在 Docker 文件裡被稱為 Compose file）是以縮排來制定階層的，所以**縮排在這個檔案裡非常重要，縮排有錯誤的話就會無法執行。**

### 5. 設定 Nginx 容器
##### 建立 docker-compose.yml 檔
在 docker-compose.yml 檔案裡加入以下內容：

```
version: '3.7'

# Services
services:

  # Nginx Service
  nginx:
    image: nginx:1.17
    ports:
      - 80:80
```
##### 內容解讀：
- 第一行的 version 真的讓人有點錯亂，剛剛 docker-compose --version 印出來的不是 1.XX 版嗎？ Docker 的版本也是 19.XX，為什麼這裡的版本要寫 3.X，我也沒有看到哪個教學文章有解釋，所以自已去查了一下，發現它是 Compose File 的版本（大概就是制定 Compose File 格式、寫法……之類的版本吧？）總之，這裡的 version 不是 Docker 的版本，也不是 Docker-compose 的版本，而是 (Docker) Compose File 的版本。  
（[Docker - Compose File](https://docs.docker.com/compose/compose-file/)）

- 接下來 services 區塊就是我們想要建立、啟動的服務，第一個就是 nginx 啦！image 可以指定要 Docker Compose 去 docker hub 抓哪一個 image 回來，（Docker Hub 可以想像成 Node 的 npm，當然實際內容完全不一樣就是了，反正就是存了很多 Docker 映像檔的線上檔案庫），port 則是設定本機與容器之間 port 的對應（前面為本機端，後面為容器）。

##### 測試
在 docker-compose.yml 同一個資料夾裡下指令：`sudo docker-compose up -d`，docker compose 就會自動去 docker hub 把 nginx 映像檔抓下來，PORT 設定好，然後啟動 nginx 容器。指令大部分都很直觀，只有最後一個 `-d` 的選項可能要解釋一下，它其實就是要求 docker compose 啟動所有容器之後自動在背景運行，然後交還命令列的使用權。
這時候回到自已的電腦上，打開一個瀏覽器，輸入 AWS EC2 的 ipv4 位址，應該就可以看到 nginx 成功啟動的頁面了。

在遠端主機上輸入 `sudo docker ps` 或 `sudo docker-compose ps` 都可以看到關於正在運行容器的資訊。

### 6. 設定 php-fpm
##### 修改 docker-compose.yml 檔
先 `sudo docker-compose stop` 停止所有 docker compose 管理的容器，再次打開 docker-compose.yml 檔案修改成下面的內容：
```
version: '3.8'

# Services
services:

  # Nginx Service
  nginx:
    image: nginx:1.17
    ports:
      - 80:80
# 以下是新增的內容：
    volumes:
      - ./src:/var/www/php:ro
      - ./.docker/nginx/conf.d:/etc/nginx/conf.d:ro
    depends_on:
      - php

  # PHP Service
  php:
    image: php:7.4-fpm
    working_dir: /var/www/php
    volumes:
      - ./src:/var/www/php
```
##### 新增的內容有幾個重要的地方：
  - volumes 指定 AWS EC2 主機資料夾掛載到 Docker 容器裡的資料夾，前面的是 EC2 主機的資料夾，後面的就是 Docker 容器裡的掛載點。
  以這裡的內容為例，./src 就是在 docker-compose.yml 所在資料夾裡的 src/ 資料夾，它會同時被掛載到兩個 docker 容器的 `/var/www/php` 這個資料夾裡；而 `./.docker/nginx/conf.d` 則會被掛載到 nginx 容器的 `/etc/nginx/conf.d` 資料夾。
  在每個載掛設定後面加上的 `:ro` 是 read only 的意思。

  - 在 Nginx volumes 下面的還有一個區塊：
    ```
    depends_on:
      - php
    ```
    這是為了讓 Docker Compose 知道 Nginx 如果要載入 php 檔的話，必需依賴 php-fpm 的服務，加上這一部分 Docker Compose 就會在 Nginx 容器啟動之前先啟動 php-fpm 容器。 


因為我們還沒有在 EC2 主機的資料夾裡建立 `./src` 以及 `./.docker/nginx/conf.d` 這兩個資料夾，也還沒有加入 php 檔與 nginx 的設定檔，所以還不能啟動。

##### 啟動前要先新增下面的檔案：
- 建立 `./src` 與 `./.docker/nginx/conf.d` 資料夾  
`./src` 會放入我們網站的原始碼，`./.docker` 資料夾裡會放入與 docker 容器設定相關的檔案，所以 `./.docker/nginx/conf.d` 裡面就會放 nginx 容器的相關設定。
- 加入 php 檔（網站原始碼）
在 `./src/` 資料夾裡建立一個 `index.php` 檔案，內容可以是任意 php 程式碼，例如：
```
<?php
  echo "Hello Docker!";
?>
```
- 加入 php.conf 檔（Nginx 設定檔）
在 `./.docker/nginx/conf.d/` 資料夾裡建立 `php.conf` 檔，Nginx 會自動讀取 `conf.d/` 資料夾裡面以 `.conf` 結尾的檔案。  
`php.conf` 的內容如下：
```
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root   /var/www/php;
    index  index.php;

    location ~* \.php$ {
        fastcgi_pass   php:9000;
        include        fastcgi_params;
        fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param  SCRIPT_NAME     $fastcgi_script_name;
    }
}
```
- 有兩個 listen 項目，上面的是 ipv4，下面是 ipv6。
- root 指定網站根目錄，這個目錄是「容器內」的路徑，不是 EC2 主機的路徑。
- index 指定 index 檔。
- location 區塊是 php 的相關設定：
第一行是讓 Nginx 把相關設定套用在所有 php 檔。
第二行會讓 Nginx 接到 php 相關的 requset  時會自動導向 php 容器的 9000 port（Docker Compose 厲害的就是已經自動幫我們處理好容器間的連線了）

關於 Nginx 與 PHP 更詳細的設定可以參考 Linode 上面的教學，我覺得寫的蠻清楚的
[Getting Started with NGINX - Part 1: Installation and Basic Setup](https://www.linode.com/docs/web-servers/nginx/nginx-installation-and-basic-setup/#configuration-recap)  
[Serve PHP with PHP-FPM and NGINX](https://www.linode.com/docs/web-servers/nginx/serve-php-php-fpm-and-nginx/)  

在完成上面的步驟之後，專案資料夾的結構應該會長成這樣：
```
docker-tutorial/
├── .docker/
│   └── nginx/
│       └── conf.d/
│           └── php.conf
├── src/
│   └── index.php
└── docker-compose.yml
```
##### 測試
可以再執行一次 `sudo docker-compose up -d`（重新啟動之前要記得 `sudo docker-compose stop`），這時候在自已電腦上開啟瀏覽器，連上 EC2 的 ip 位址，就可以看到 `index.php` 的內容啦！而且，在 EC2 遠端主機上修改 `index.php` 檔案的話也可以馬上看到修改後的結果。

### 7. 設定 MySQL
##### 再修改一次 `docker-compose.yml`
內容如下：

```
version: '3.7'

# Services
services:

  # Nginx Service
  nginx:
    image: nginx:1.17
    ports:
      - 80:80
    volumes:
      - ./src:/var/www/php:ro
      - ./.docker/nginx/conf.d:/etc/nginx/conf.d:ro
    depends_on:
      - php

  # PHP Service
  php:
    build: ./.docker/php
    working_dir: /var/www/php
    volumes:
      - ./src:/var/www/php
    depends_on:
      - mysql

  # MySQL Service
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: {rootpassword}
      MYSQL_DATABASE: {db_name}
      MYSQL_USER: {user}
      MYSQL_PASSWORD: {userpassword}
    volumes:
      - ./.docker/mysql/my.cnf:/etc/mysql/conf.d/my.cnf:ro
      - mysqldata:/var/lib/mysql

# Volumes
volumes:

  mysqldata:
```
##### 修改要點：
- php 容器下面本來的 image 用 build 取代了，這裡就是跟 Docker Compose 說：「我現在不要直接抓 Docker Hub 上面的映像檔了，請幫我 build 在 `./.docker/php/` 這個資料夾裡面的 Dockerfile。」
（所以等一下就要在 `./.docker/php/` 裡建立一個 Dockerfile。）
- MySQL 容器的 environment 可以設定 root 密碼、資料庫名稱、使用者、使用者密碼，設定好之後在啟動 MySQL 容器時就會自動把這些資料設定好。（除此之外還有很多其它設定內容，可以參考 MySQL image 的文件）。
- MySQL volumes 裡的 my.cnf 是 MySQL 的設定檔（ 等一下也會說明要寫什麼內容。）
  mysqldata 則是設定一個儲存資料庫的位置，對應到 MySQL 容器裡 `/var/lib/mysql/` 這個資料夾。
- 最後，與 services 同一階層，新增一個 volumes 設定，指定 mysqldata 在 EC2 主機上的儲存位置，沒有指定的話預設會存在 `/var/lib/docker/volumes/` 這個資料夾裡，在啟動容器之後可以到那個資料夾裡看看，會找到一個 `{專案資料夾名稱}_mysqldata` 的資料夾，裡面就是 MySQL 資料庫的資料了。

##### 新增檔案：
###### - php 容器 Dockerfile
建立 ./.docker/php/ 資料夾，然後新增一個檔案名命為 `Dockerfile`，這是為了讓 Docker Compose 依照這個檔案的內容 build 一個 php 容器，裡面的內容如下：
  ```
  FROM php:7.4-fpm
  RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
  ```
  （這一部分與教學文章裡有些不同，教學文裡是用 pdo_mysql 這個套件，而我是使用課程裡教的 mysqli 套件。）

###### - 網站入口 index.php
接著可以在 `index.php` 檔裡面加入連接 MySQL 資料庫的程式碼：
```
$host_name = "mysql";
$username = "username";
$password = "userpassword";
$db_name = "db_name";

$conn = new mysqli($host_name, $username, $password, $db_name);
print_r($conn);
```
藉由印出 $conn 的內容到網頁上，可以觀察是不是有順利連接到 MySQL 資料庫

###### - MySQL 設定檔
剛剛提到 MySQL 的設定檔加入下面的內容，設定資料庫使用的編碼：
```
[mysqld]
collation-server     = utf8mb4_unicode_ci
character-set-server = utf8mb4
```

##### 測試
同樣下指令重新啟動 Docker Compose：`sudo docker-compose restart`，在瀏覽器裡應該就會印出連接 MySQL 資料庫的內容，只要 connect_error 裡面沒有什麼異狀，那就是三個容器都有連接成功了。

##### 大推 CLI 開資料庫表格
因為我自己已經習慣用 CLI 的方式開資料庫表格，所以就不另外安裝 phpMyAdmin了。其實熟悉流程之後，只要準備好 SQL 指令的小抄，其實用手打指令的方式也沒有比較慢，如果真的還是想要裝 phpMyAdmin 的話，英文的教學文（[Docker for local web development, part 1: a basic LEMP stack - phpMyAdmin](https://tech.osteel.me/posts/docker-for-local-web-development-part-1-a-basic-lemp-stack#phpmyadmin)）裡面也有寫，大家再自已去試試囉！

### 結尾
到這裡就算是完成「用 Docker 在 AWS EC2 上部署 LEMP 網站」的任務，之後就是開好資料庫表格，把寫好的 php 檔案用 sftp 的方式傳上 EC2 主機（到 `./src/` 資料夾裡）， 再設定好域名、ip 綁定，就可以看到自已 Dockerize 之後的網站了！

其實這篇筆記大部分可以算是[這篇文章](https://tech.osteel.me/posts/docker-for-local-web-development-part-1-a-basic-lemp-stack)的翻譯，然後加上一些自已的理解與調整，算是給自已做一個記錄，走過路過，如果有看到任何錯誤，或是不夠清楚的地方再拜託跟我講一下囉！

### 其它有用指令補充

- 查看 Docker Compose 記錄檔
`docker-compose logs -f`
這個指令可以列出所有容器的 log 記錄，方便 debug。
- 進入容器內操作
`sudo docker-compose exec mysql bash`
這個指令就可以進入 mysql 容器裡進行操作，對於開資料表格很有用。

（這篇參考文章還有更多有用指令：[Commands summary and cleaning up your environment](https://tech.osteel.me/posts/docker-for-local-web-development-part-1-a-basic-lemp-stack#commands-summary-and-cleaning-up-your-environment)）

以上，若有錯漏還請指教，謝謝。 ^_^