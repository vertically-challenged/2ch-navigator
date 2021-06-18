const {Router} = require('express')
const router = Router()

const Query = require('../project_modules/Query')
const Bloodhound = require('../project_modules/Bloodhound/Bloodhound')

// Здесь создается объект ищейки, за пределами обработки запроса, а в запросе мы обращаемся к методам данного объекта 

const bloodhoundObj = new Bloodhound()

router.get('/', async (req, res) => {
    // const searchResults = []
    let boardsStr = '/b'
    if (req.cookies.boardsStr) {
        boardsStr = req.cookies.boardsStr
    } 
    if (req.query.boards) boardsStr = req.query.boards

    res.cookie('boardsStr', boardsStr)

    try {

        if (!(req.query == undefined || Object.keys(req.query).length == 0)) {
            let searchQuery = new Query(req.query)
            var searchResults = await bloodhoundObj.defaultSearch(searchQuery)
            console.log(searchQuery)
            // console.log(req.query)
            // console.log('Запрос...')
            // console.log('Релевантные посты', await bloodhoundObj.defaultSearch(searchQuery))
        }

        console.log('Cookie: ', req.cookies)

        res.render('index', {
            title: '2ch navigator', 
            searchResults, 
            searchText: req.query.search,
            DEFAULT_BOARD: boardsStr
        });

    } catch (err) {
        console.log(err)
    }
})

module.exports = router