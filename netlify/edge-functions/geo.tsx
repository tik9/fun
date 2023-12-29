
import React from "https://esm.sh/react";
import { renderToReadableStream } from "https://esm.sh/react-dom/server";
import type { Config, Context } from "@netlify/edge-functions";

export default async function handler(req: Request, context: Context) {
    console.log(context.geo)
    const stream = await renderToReadableStream(
        <html>
            <title>local server < /title>
                < body >
                    <h1>Local server is in {context.geo.city}, {context.geo.country?.name} < /h1>
                        This is k koerner koesching
                        < /body>
                        < /html>
                        );

                        return new Response(stream);
}

                        export const config = {path: "/geo" };

