const HelperForArr = require('../project_modules/helpers/HelperForArr')
const HelperForStr = require('../project_modules/helpers/HelperForStr')

class Query {
    constructor (query) {
        let searchObj = Query.decompositionSearch(query.search)
        let boardsArr = Query.decompositionBoards(query.boards)

        this.boards = boardsArr
        this.modifiers = searchObj.modifier
        this.text = searchObj.text.join(' ').toLowerCase()
        this.files = searchObj.files
    }

    // decompositionSearch(Строка search) => Объект search
    static decompositionSearch (search) {
        let searchArr = HelperForArr.deleteEmptyStringsFromArray(search.split(' '))
        let text = [], modifier = [], files = []
    
        searchArr.forEach((item) => {
            if (item.includes('.') && item.split('.')[1] != '') {
                files.push({
                    fileName: item.split('.')[0].toLowerCase(), 
                    fileType: item.split('.')[1].toLowerCase()
                })
            } else if (item.includes('#')) {
                modifier.push(item)
            } else {
                text.push(item)
            }
        })
    
        return {text, modifier, files}
    }

    // decompositionBoards(Строка boards) => массив досок без /
    static decompositionBoards (boards) {
        let boardsArr = HelperForArr.deleteEmptyStringsFromArray(boards.split(' '))
        for (let idx in boardsArr) {
            boardsArr[idx] = HelperForStr.eraseCharFromString(boardsArr[idx], '/') 
        }
        return boardsArr
    }
}

module.exports = Query