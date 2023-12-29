var net_fun = '/.netlify/functions/'

index()
function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function index() {
    // await sleep(500)
    // accounts();
    // commits();
    // convert();
    // issues();
    // posts();
    repos()
    // api();
    // sys_client()
    // sys_server()
}
