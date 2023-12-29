import { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    // const { city, country } = context.params
    // const city = req.query.name
    // const para = new URL(req.url).searchParams.get('a')
    var city = await req.text()
    // return new Response(`Travel guide for ${city} in ${country}!`)
    return new Response('Travel guide for ' + city)
}

export const config: Config = {
    path: "/test1/:country/:city"
}