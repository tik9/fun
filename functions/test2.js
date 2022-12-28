
export async function handler() {
    var res
    res = '1'
    return { statusCode: 200, body: res }
}

const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => {
    setTimeout(() => resolve(2), 1000)
})
const p3 = new Promise((resolve) => {
    setTimeout(() => resolve(3), 3000)
})
const p4 = Promise.reject('err4')
const p5 = Promise.reject('err5')

// 1. All Promises Succeed
const p11 = Promise.all([p1, p2, p3])
    .then(console.log) // [ 1, 2, 3 ]
    .catch(console.log)

// 2. There is a Promise that fails
const p12 = Promise.all([p1, p2, p4])
    .then(console.log)
    .catch(console.log) // err4

// 3. There are two Promise failures, you can see the final output is err4, the first failed return value
const p13 = Promise.all([p1, p4, p5])
    .then(console.log)
    .catch(console.log) // err4