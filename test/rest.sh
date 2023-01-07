
all() {
    res=$(mongo)
    echo $res|jq
    # res=$(utils_sort3 "$res")
}

api_joke() { ntl functions:invoke rapid --port 80 --querystring 'input=abc' ;}

api_trans() { ntl functions:invoke rapid --port 80 --payload '{"q":"abc"}' ;}

gh_issue() { ntl functions:invoke issues --port 80 --querystring 'repo=tik' ;}

mongo() { ntl functions:invoke ${FUNCNAME[0]} --port 80 --querystring 'op=find&coll=tools' ;}

sortList() { ntl functions:invoke utils --port 80 --payload '{"type":"sortList", "val":{"tool":2,"cat":2 }}' ;}

sortTable() { ntl functions:invoke utils --port 80 --payload '{"type":"sortTable", "val":[{"category":2,"tool":2},{"category":1,"tool":1},{"category":2,"tool":1}],"sort1":"category","sort2":"tool"}' ;}

sortTab2() { ntl functions:invoke utils --port 80 --payload '{"type":"sortTable", "val":[{"category":2,"tool":2},{"category":1,"tool":1},{"category":2,"tool":1}],"sort1":"","sort2":""}' ;}

sortTab3() { 
    # echo foo $1
    ntl functions:invoke utils --port 80 --payload '{"type":"sortTable", "val":$1,"sort1:"category"}' 
}

time_api() { curl -s 'https://timeapi.io/api/Time/current/zone?timeZone=UTC' ;}

utils_time() { ntl functions:invoke utils --port 80 --querystring 'q=123456' ;}

utils_trunc() { ntl functions:invoke utils --port 80 --payload '{"type":"truncate", "val":"1234567","cut":3}' ;}


$@