
serv=http://localhost:8888
servn=http://tik2.netlify.app
servn_te=$servn/test.html
servn_sys=$servn/sys.html

function all {
    ntl functions:invoke accounts 
    post=posts
    # echo '\ncomm_repos:'
    # run-func lib/git.js comm_repos 
    echo "\n$post:"
    # echo '[]' > json/$post.json
    ntl functions:invoke $post
    run-func functions/file.js create
}

function mongo { ntl functions:invoke ${FUNCNAME[0]} | jq ;}
function serv { curl -s $serv | jq ;}
function servn { curl -sL $servn | jq ;}
function servn_te { curl $servn_te | jq ;}
function servn_sys { curl -v $servn_sys | jq ;}
function time { curl -s 'https://timeapi.io/api/Time/current/zone?timeZone=UTC' ;}

$@