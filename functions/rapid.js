
import axios from 'axios';

export const handler = async (event) => {
    var params = event.queryStringParameters
    params = (Object.keys(params).length !== 0) ? params : { type: 'joke', input: 'abc' }

    var url
    if (params.type == 'joke') {
        url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search'
        params = { query: params.input }
    }
    else if (params.type == 'clock') {
        url = 'https://world-time2.p.rapidapi.com/ip'
        params = ''
    }
    else {
        url = 'https://alpha-vantage.p.rapidapi.com/query'
        params = { symbol: params.input, interval: '5min', function: 'time_series_monthly' }
    }
    console.log(params)
    try {
        var options = {
            method: 'get',
            url: url,
            params: params,
            headers:
                { 'x-rapidapi-key': process.env.rapid }
        }
        var res = (await axios.request(options)).data
        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }
    } catch (err) {
        return {
            statusCode: 404,
            body: console.log('error here', err)
        };
    }
}
