
serv=http://localhost:8888
servn=http://tik2.netlify.app
servn_te=http://tik2.netlify.app/test.html
servn_sys=http://tik2.netlify.app/sys.html
test=12

function cloud {

    # ntl functions:invoke accounts 
    post=posts
    # echo '\ncomm_repos:'
    # run-func lib/git.js comm_repos 
    echo "\n$post:"
    echo '[]' > json/$post.json
    ntl functions:invoke $post 
}

function file { ntl functions:invoke ${FUNCNAME[0]} --querystring 'dir=js' ;}

function mongo { ntl functions:invoke ${FUNCNAME[0]} | jq ;}
function serv { curl -s ${FUNCNAME[0]} | jq ;}

function servn { curl -sL $servn | jq ;}
function servn_te { curl $servn_te | jq ;}
function servn_sys { curl -v $servn_sys | jq ;}

$@