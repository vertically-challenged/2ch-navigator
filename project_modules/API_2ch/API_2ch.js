const config = require('./API_2ch_config')
const fetch = require('node-fetch')

class API_2ch {
    static async api () {
        await fetch('https://2ch.hk/b/catalog.json')
            .then(res => res.json())
            .then(res => {
                let arr = res.threads;
                arr.forEach((i) => {
                    console.log(i.comment)
                })
                //console.log(res.threads[0].comment)
            })
    }
}

module.exports = API_2ch