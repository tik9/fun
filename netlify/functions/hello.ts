
import { Handler } from "@netlify/functions";

//@ts-ignore
const handler: Handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify('he wo')
    }
};

export { handler };