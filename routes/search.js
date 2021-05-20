const {Router} = require('express');
const fetch = require('node-fetch');
const router = Router(); 

const config = require('../Bloodhound/Bloodhound');

async function api () {
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

// Удаляет пустые строки из массива строк, возвращает новый массив без пустых строк
function deleteEmptyStringsFromArray (arr) {
    let newArr = []
    arr.forEach((item) => {
        item == '' || newArr.push(item)
    })
    return newArr
}

// eraseFromString([Строка], [символ, которые необходимо из нее удалить]) => Новая строка без ненужного символа 
function eraseFromString (str, char) {
    let newStr = ''
    str
        .split('')
        .forEach((item) => {
            newStr += (item != char) ? item : '' 
        })
        
    return newStr
}

// decompositionSearch(Строка search) => Объект search
function decompositionSearch (search) {
    let searchArr = deleteEmptyStringsFromArray(search.split(' '))
    let text = [], modifier = [], files = []

    searchArr.forEach((item) => {
        if (item.includes('.')) {
            files.push({
                fileName: item.split('.')[0], 
                fileType: item.split('.')[1]
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
function decompositionBoards (boards) {
    let boardsArr = deleteEmptyStringsFromArray(boards.split(' '))
    for (let idx in boardsArr) {
        boardsArr[idx] = eraseFromString(boardsArr[idx], '/') 
    }
    return boardsArr
}

function createQueryObject (query) {
    let searchObj = decompositionSearch(query.search)
    let boardsArr = decompositionBoards(query.boards)

    return {
        board: boardsArr, 
        modifier: searchObj.modifier,
        text: searchObj.text.join(' '), 
        files: searchObj.files
    }
}

router.get('/', (req, res) => {
    req.query == undefined || console.log(createQueryObject (req.query))
    res.render('index', {
        title: '2ch navigator'
    });
})

module.exports = router