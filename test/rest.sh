
serv=http://localhost
servn=http://tifun.netlify.app

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

function time { curl -s 'https://timeapi.io/api/Time/current/zone?timeZone=UTC' ;}

$@