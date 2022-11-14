
api_key=$(cat $HOME/tik/.env | sed -n 1p | cut -f2 -d= )

# url=https://data.mongodb-api.com/app/data-azpvn/endpoint/data/beta/action
url=https://data.mongodb-api.com/app/data-azpvn/endpoint/data/v1/action

db=website
dataSource=tik

# if jq -e . >/dev/null 2>&1 <<< $(cat $json); then echo parsing ok ;fi

# echo 1 $1 2 $2 3 $3
# jq=$(jq -n --arg dataSource $dataSource --arg db $db --arg collection ${2:-tools} --arg key ${3:-tool} --arg value ${4:-git} '{dataSource: $dataSource, collection:$collection,database: $db, filter:{ ($key): $value }}')

function test { echo 1 ;}

function deleteOne { curl -s $url/${FUNCNAME[0]} --header api-key:$api_key --data "$jq" ;}

function find {
    file=$HOME/tik/json/$1.json
    # cat $file
     jq=$(jq -n --arg dataSource $dataSource --arg collection ${1:-pages} --arg db $db --arg sort ${3:-page} --argjson limit ${2:-2} '{dataSource:$dataSource,collection: $collection, database:$db, limit:$limit, sort: {($sort) : 1 }}')

    curl -s $url/${FUNCNAME[0]} --header "api-key: $api_key" --data "$jq" | jq '.documents' 
    # = (if type == "string" then .[0:10] else . end)'
}

function findOne {
    echo 2 $2 3 $3 $4
    curl -s $url/${FUNCNAME[0]} --header api-key:$api_key --data "$jq" | jq
}

function insertMany {
    collection=$1;json_string=$2
    if [ -z $1 ]; then collection=tools ; json_string=$json ;fi 
    jq=$(jq -n --arg dataSource $dataSource --arg db $db --arg collection $collection --slurpfile json $json_string '{dataSource:$dataSource, collection:$collection, database:$db, documents:$json[]}')
    # echo $jq

    curl -s $url/${FUNCNAME[0]} --header 'api-key: '$api_key --data "$jq"
}

function insertOne {
    #  --arg key2 $4 --arg val2 $5
    jq=$(jq -n --arg dataSource $dataSource --arg db $db --arg collection $1 --arg key1 $2 --arg val1 $3 '{dataSource:$dataSource, collection:$collection, database:$db, document:{ ($key1): $val1 }}')
    curl -s $url/${FUNCNAME[0]} --header 'api-key: '$api_key --data "$jq"
}

"$@"

# deleteOne words doc test2
# findOne 
# insertOne words doc test2
# insertMany