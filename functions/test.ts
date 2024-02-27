

import { resolve } from 'path'

let json = resolve('public', `json/${import.meta.url.split("/").pop().split('.')[0]}.json`)

export default async () => {
    let res = json
    console.log(1, res)
    return new Response(res)
}