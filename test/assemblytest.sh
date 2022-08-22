
assembly_api=$(cat $HOME/netlify/.env | sed -n 6p | cut -f2 -d= )

transcript=https://api.assemblyai.com/v2/transcript
server=http://localhost:3000

function api { curl $server/${FUNCNAME[0]};}

function assembly1 {
    curl -s --url $transcript \
  --header "authorization: $assembly_api" \
  --data '{"audio_url": "https://bit.ly/3yxKEIY" }'|jq
}

function assembly2 {
    curl -s --url $transcript/odypukjoqf-dcf5-4485-b1f8-765b4227e759 \
  --header "authorization: $assembly_api" |jq .text
}

$@