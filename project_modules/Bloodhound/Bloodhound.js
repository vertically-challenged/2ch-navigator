const config = require('./Bloodhound_config')
const API_2ch = require('../API_2ch/API_2ch')

class Bloodhound {
    constructor () {
        
    }
// Способы поиска описываются как методы будущего объекта

    async defaultSearch () {
        // let result = await API_2ch.getListOfBoardThreads()
        // console.log(result)

        let result = await API_2ch.getThread()
        console.log(result.Board)

        // API_2ch.getListOfBoardThreads()
    }
}

module.exports = Bloodhound;