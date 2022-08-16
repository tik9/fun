
api_key=$(cat $HOME/tik/.env | sed -n 1p | cut -f2 -d= )

curl -H "Authorization: Bearer $api_key" https://api.netlify.com/api/v1/sites