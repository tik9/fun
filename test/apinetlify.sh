
function net {
    api_key=$(cat $HOME/fun/.env | sed -n 7p | cut -f2 -d= )
    path=sites
    path=user
    res=$(curl -sH "Authorization: Bearer $api_key" https://api.netlify.com/api/v1/$path)
    echo $res| jq '.last_login'
    echo $res| jq '.site_count'
    # echo $res|jq '.[0]'
    # echo $res|jq '.[0].name'
    # echo $res|jq '.[0].updated_at'
}

# net