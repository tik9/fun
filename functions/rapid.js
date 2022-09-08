
import axios from 'axios';

export const handler = async (event) => {
    var params = event.queryStringParameters
    params = (Object.keys(params).length !== 0) ? params : { type: 'joke', input: 'abc' }

    var url
    var method = 'get'
    if (params.type == 'joke') {
        url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search'
        params = { query: params.input }
    }
    else if (params.type == 'clock') {
        url = 'https://worldtime5.p.rapidapi.com/api/world-time/datetime-now'
        params = ''
        method = 'post'
        var data = '{"datetime_format":"ZZ","timezones":["Europe/Berlin"]}'
    }
    else {
        url = 'https://alpha-vantage.p.rapidapi.com/query'
        params = { symbol: params.input, interval: '5min', function: 'time_series_monthly' }
    }
    // console.log(1, params, 2, method, data)
    try {
        var options = {
            method: method,
            data: data,
            url: url,
            params: params,
            headers: { 'x-rapidapi-key': process.env.rapid }
        }
        var res = (await axios.request(options)).data

        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }
    } catch (err) { return { body: console.log('error here', err), statusCode: 500 } }
}
