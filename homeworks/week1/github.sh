# 以 curl 連接 api 取得使用者資料並傳入 userData 變數中
userData=$(curl --silent -X GET "https://api.github.com/users/$1")

# 遍歷四個字串
for i in '"name"' '"bio"' '"location"' '"blog"'
do
  # 用 grep 抓到字串，sed 加上正規表達式處理字串（刪除不需要的部分），然後傳入 thisField 變數中
  thisField=$(echo "$userData" | grep $i | sed 's/"//g' | sed 's/,$//g')
  # 使用 cut 「剪」出最後需要的部分
  # 但是因為使用的 delimiter（分界符號）是 ":"，而 blog 的資料（網址）中有兩個 ":"，所以加上一個條件判斷
  if [ "$i" = '"blog"' ]
    then
      echo "$thisField" | cut -d ":" -f 2-3
    else
      echo "$thisField" | cut -d ":" -f 2
  fi
done
