const config = require('./Bloodhound_config')
const API_2ch = require('../API_2ch/API_2ch')

class Bloodhound {
    constructor () {
        
    }
// Способы поиска описываются как методы будущего объекта

    async defaultSearch () {
        console.log(await (await Bloodhound.getData()).length)
        // try {
        //     let result = await API_2ch.getThread('b', 247598850)
        //     console.log(result.Board)
        // } catch (err) {
        //     console.log(err)
        // }
        // let result = await API_2ch.getListOfBoardThreads()
        // console.log(result)
        // API_2ch.getListOfBoardThreads()
    }

    static async getData (boards = config.DEFAULT_BOARDS, isOP = false) {
        let data = []

        for (let board of boards) {
            let listOfBoardThreads = await API_2ch.getListOfBoardThreads(board)
            // console.log(listOfBoardThreads.threads)
            for (let thread of listOfBoardThreads.threads) {
                if (isOP) {
                    data.push(thread)
                } else {
                    console.log(thread.num)
                    let arrayOfPostsFromThisThread = await API_2ch.getPostsFromThisThread(board, thread.num)
                        for (let post of arrayOfPostsFromThisThread) {
                            data.push(post)
                        }
                }
            }
        }

        return data
    }


}

module.exports = Bloodhound;