echo 您想要建立幾個檔案？請輸入一個正整數：

read num

for i in `seq 1 $num`
do
  touch $i.js
done
echo 已為你建立$num個檔案
