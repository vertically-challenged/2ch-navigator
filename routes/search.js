const {Router} = require('express')
const router = Router()

const Query = require('../project_modules/Query')
const Bloodhound = require('../project_modules/Bloodhound/Bloodhound')
const Bloodhound_config = require('../project_modules/Bloodhound/Bloodhound_config')

const bloodhoundObj = new Bloodhound()

router.get('/', async (req, res) => {
    let boardsStr = '/pr'
    if (req.cookies.boardsStr) boardsStr = req.cookies.boardsStr
    if (req.query.boards) boardsStr = req.query.boards
    res.cookie('boardsStr', boardsStr)

    try {

        if (!(req.query == undefined || Object.keys(req.query).length == 0)) {
            let searchQuery = new Query(req.query)
            var searchResults = await bloodhoundObj.defaultSearch(searchQuery)
        }

        res.render('index', {
            title: '2ch navigator', 
            searchResults, 
            searchText: req.query.search,
            DEFAULT_BOARD: boardsStr, 
            BLOCKED_BOARDS: '/'+ Bloodhound_config.BLOCKED_BOARDS.join(' /')
        });

    } catch (err) {
        console.log(err)
    }
})

module.exports = router