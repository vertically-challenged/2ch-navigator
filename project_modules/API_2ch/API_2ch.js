const config = require('./API_2ch_config')
const fetch = require('node-fetch')
const HelperForStr = require('../helpers/HelperForStr')

class API_2ch {

    static async getListOfBoardThreads (boardLetter = config.DEFAULT_BOARD) {
        let allThreads = await fetch(HelperForStr.substringReplacement(config.ALL_THREADS_LINK, config.PLUGS.BOARD, boardLetter)).then(res => res.json())
        
        return allThreads
    }

    static async getThread (boardLetter = config.DEFAULT_BOARD, threadNumber = 247574565) {
        let thread = await fetch(HelperForStr.substringReplacement(HelperForStr.substringReplacement(config.THREAD_LINK, config.PLUGS.BOARD, boardLetter), config.PLUGS.THREAD_NUMBER, threadNumber)).then(res => res.json())
        
        return thread
    }
}

module.exports = API_2ch