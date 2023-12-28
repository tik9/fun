import { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    // const { city, country } = context.params
    // const city = req.query.name
    const para = new URL(req.url).searchParams.get('a')

    // return new Response(`Travel guide for ${city} in ${country}!`)
    return new Response('Travel guide for ' + para)
}

// export const config: Config = {
// path: "/test1/:country/:city"
// }