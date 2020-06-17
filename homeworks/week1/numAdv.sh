#!/bin/bash
echo 您想要建立幾個檔案？請輸入一個正整數：

read num

if ! [[ "$num" =~ ^[0-9]+$ ]]
then
  echo 請輸入一個正整數
else
  for i in `seq 1 $num`
  do
    touch $i.js
  done
  echo 已為你建立$num個檔案
fi
