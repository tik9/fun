
head="Accept: application/vnd.heroku+json; version=3"
hero_base=https://api.heroku.com
hero_apps=$hero_base/apps/tik9
selection=repo_size
selection=slug_size
selection=updated_at

function hero_rel { 
    res=$(curl -ns  -s $hero_apps/releases -H "$head"  |jq .[-1].$selection)
    echo $res
    }

function hero_app { 
    res=$(curl -ns $hero_apps -H "$head")
    res=$(echo "$res" |jq .$selection)
    res=$(echo $res/1024^2 | bc)

    echo $res
}

function stack { curl -s https://api.stackexchange.com/2.2/users/1705829?site=stackoverflow | jq;}

$@