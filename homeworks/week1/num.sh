# for 迴圈， 從 1 到 $1 個執行一次
# $1 是執行 script 接在後面傳入的第一個參數，Ex：./num.sh 99，$1 就是 99。
for i in `seq 1 $1`
do
  touch $i.js # 摸一個 $i.js檔
done
echo 已建立$1個檔案 # 印出建立檔案數量
