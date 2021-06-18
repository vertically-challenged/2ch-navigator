const {Router} = require('express')
const router = Router()

const Query = require('../project_modules/Query')
const Bloodhound = require('../project_modules/Bloodhound/Bloodhound')

// Здесь создается объект ищейки, за пределами обработки запроса, а в запросе мы обращаемся к методам данного объекта 

const bloodhoundObj = new Bloodhound()

router.get('/', async (req, res) => {
    // const searchResults = []
    try {

        if (!(req.query == undefined || Object.keys(req.query).length == 0)) {
            let searchQuery = new Query(req.query)
            var searchResults = await bloodhoundObj.defaultSearch(searchQuery)
            // console.log(searchResults[1])
            // console.log(req.query)
            // console.log('Запрос...')
            // console.log('Релевантные посты', await bloodhoundObj.defaultSearch(searchQuery))
        }

        res.render('index', {
            title: '2ch navigator', 
            searchResults, 
            searchText: req.query.search,
            DEFAULT_BOARD: '/b'
        });

    } catch (err) {
        console.log(err)
    }
})

module.exports = router