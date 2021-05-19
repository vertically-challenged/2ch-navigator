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

function deleteEmptyStringsFromArray (arr) {
    let newArr = []
    arr.forEach((item) => {
        item == '' || newArr.push(item)
    })
    return newArr
}

function decompositionSearch (search) {
    // console.log(search)
    let searchArr = deleteEmptyStringsFromArray(search.split(' '));
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

function createQueryObject (query) {
    let searchObj = decompositionSearch(query.search);

    return {
        board: query.boards.split(' '), 
        modifier: searchObj.modifier,
        text: searchObj.text.join(' '), 
        files: searchObj.files
    }
}

router.get('/', (req, res) => {
    console.log(createQueryObject (req.query));
    res.render('index', {
        title: '2ch navigator'
    });
})

module.exports = router;