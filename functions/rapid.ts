
import axios, { AxiosRequestConfig } from 'axios';
import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
    var res
    var params = event.queryStringParameters!
    params = (Object.keys(params).length !== 0) ? params : { type: 'joke', input: 'abc' }

    var url: string
    if (params.type == 'joke') url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search'
    else url = 'https://alpha-vantage.p.rapidapi.com/query'

    var res = (await axios.request({
        method: 'get',
        url: url,
        params: {
            query: params.input,
            function: 'time_series_monthly',
            symbol: params.input,
            interval: '5min'
        },
        headers: { 'x-rapidapi-key': process.env.rapid! }
    })).data

    return { statusCode: 200, body: JSON.stringify(res) }
}
