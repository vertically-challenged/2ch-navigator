const {Router, query} = require('express')
const router = Router()

const Query = require('../project_modules/Query')
const Bloodhound2 = require('../project_modules/Bloodhound/Bloodhound')

// Здесь создается объект ищейки, за пределами обработки запроса, а в запросе мы обращаемся к методам данного объекта 

const bloodhoundObj = new Bloodhound2()

router.get('/', (req, res) => {
    try {
        if (!(req.query == undefined || Object.keys(req.query).length == 0)) {
            let searchQuery = new Query(req.query)
            console.log(searchQuery)

            bloodhoundObj.defaultSearch()
        }
    } catch (err) {
        console.log(err)
    }

    res.render('index', {
        title: '2ch navigator'
    });
})

module.exports = router