
server=https://netlify-express.netlify.com/.netlify/functions/server
server=http://localhost:8888
data='{"json":"POST"}'
data=

function get { curl -sL $server ;}

function post { curl -sL --header "Content-Type: application/json" --data $data $server ;}

get
# post