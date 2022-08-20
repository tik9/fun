
server=http://localhost:8888
server_n=http://tik2.netlify.app

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

function serv { curl -s $server/ | jq ;}

function servn { curl -s $server_n/sys | jq ;}

$@