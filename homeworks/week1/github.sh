userData=$(curl --silent -X GET "https://api.github.com/users/$1")

for i in '"name"' '"bio"' '"location"' '"blog"'
do
  thisField=$(echo "$userData" | grep $i | sed 's/"//g' | sed 's/,$//g')
  if [ "$i" = '"blog"' ]
    then
      echo "$thisField" | cut -d ":" -f 2-3
    else
      echo "$thisField" | cut -d ":" -f 2
  fi
done
