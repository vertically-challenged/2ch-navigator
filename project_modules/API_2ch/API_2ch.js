const config = require('./API_2ch_config')
const fetch = require('node-fetch')
const HelperForStr = require('../helpers/HelperForStr')

class API_2ch {

    // Принимает букву доски и возвращает JSON страницы этой доски
    static async getListOfBoardThreads (boardLetter = config.DEFAULT_BOARD) {
        try {
            let allThreads = await fetch(HelperForStr.substringReplacement(config.ALL_THREADS_LINK, config.PLUGS.BOARD, boardLetter))
            .then(res => {
                if (!res.ok) {
                    throw new Error(
                    `Failed with HTTP code ${res.status}
                     boardLetter: /${boardLetter}/
                    `);
                }
                return res;
            })
            .then(res => res.json())

            return allThreads
        } catch (err) {
            console.log(err)
        }
    }

    // Принимает букву доски и номер первого поста треда, возвращает JSON страницы треда
    static async getThread (boardLetter = config.DEFAULT_BOARD, threadNumber = 0) {
        try {
            let thread = await fetch(HelperForStr.substringReplacement(HelperForStr.substringReplacement(config.THREAD_LINK, config.PLUGS.BOARD, boardLetter), config.PLUGS.THREAD_NUMBER, threadNumber))
            .then(res => {
                if (!res.ok) {
                    throw new Error(
                    `Failed with HTTP code ${res.status}
                     boardLetter: /${boardLetter}/
                     threadNumber: #${threadNumber}
                    `);
                }
                return res;
            })
            .then(res => res.json())
        
            return thread
        } catch (err) {
            console.log(err)
        }
    }

    // Принимает букву доски и номер первого поста треда, возвращает массив постов данного треда
    static async getPostsFromThisThread (boardLetter = config.DEFAULT_BOARD, threadNumber = 0) {
        let arrayOfPosts = []
        try {
            let thread = await API_2ch.getThread(boardLetter, threadNumber)
            if (thread) {
                for (let post of thread.threads[0].posts) {
                    arrayOfPosts.push(post)
                }
            }
        } catch (err) {
            console.log(err)
        }
        return arrayOfPosts
    }
}

module.exports = API_2ch