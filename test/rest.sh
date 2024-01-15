
all() {
    res=$(mongo)
    echo $res|jq
    # res=$(utils_sort3 "$res")
}


issues() { ntl functions:invoke issues --port 80 --querystring 'repo=fun' ;}

mongo() { ntl functions:invoke ${FUNCNAME[0]} --port 80 --querystring 'op=find&coll=data' ;}

sortList() { ntl functions:invoke utils --port 80 --payload '{"type":"sortList", "val":{"tool":2,"cat":2 }}' ;}

sortTable() { ntl functions:invoke utils --port 80 --payload '{"type":"sortTable", "val":[{"cat":2,"tool":2},{"cat":1,"tool":1},{"cat":2,"tool":1}],"sort1":"cat","sort2":"tool"}' ;}


sortTab3() { 
    # echo foo $1
    ntl functions:invoke utils --port 80 --payload '{"type":"sortTable", "val":$1,"sort1:"cat"}' 
}

time_api() { curl -s 'https://timeapi.io/api/Time/current/zone?timeZone=UTC' ;}

utils_time() { ntl functions:invoke utils --port 80 --querystring 'q=123456' ;}

utils_trunc() { ntl functions:invoke utils --port 80 --payload '{"type":"truncate", "val":"1234567","cut":3}' ;}

chrome(){
    chromium --headless --remote-debugging-port=9222 localhost
}

$@