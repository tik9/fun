
url=https://netlify-express.netlify.com/.netlify/functions/server
# url=$url/another

function get { curl -sL $url ;}

function post { curl -sL --header "Content-Type: application/json" --data '{"json":"POST"}' $url ;}

# get
post