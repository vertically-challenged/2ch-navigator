const config = require('./Bloodhound_config')
const API_2ch = require('../API_2ch/API_2ch')

class Bloodhound {
    constructor () {
        
    }
// Способы поиска описываются как методы будущего объекта

    async defaultSearch (searchQuery) {
        try {
            let allPosts = await Bloodhound.getData(searchQuery.boards, await Bloodhound.isOP(searchQuery.modifiers))

            let checkFiles = (searchQuery.files.length != 0) ? true : false
            let checkText = (searchQuery.text.length != 0) ? true : false

            // Результат поиска будет представлять сумму этих массивов:

            if (checkFiles && checkText) {
                let firstOrderArray = []  // Посты с текстом и файлом
                let secondOrderArray = [] // Посты только с файлом 
                let thirdOrderArray = []  // Посты только с текстом 

                for (let post of allPosts) {
                    let itHasFiles = await Bloodhound.doesItHaveFiles(post, searchQuery.files)
                    let itHasText = await Bloodhound.doesItHaveText(post, searchQuery.text)
    
                    switch (true) {
                        case (itHasFiles && itHasText): 
                            firstOrderArray.push(post)
                            break
                        case itHasFiles: 
                            secondOrderArray.push(post)
                            break
                        case itHasText: 
                            thirdOrderArray.push(post)
                            break
                    }
                }

                // Перестановка очередей для более удачного отображения результата
                for ( let file of searchQuery.files) {
                    if (file.fileName.length != 0) {
                        return firstOrderArray.concat(secondOrderArray, thirdOrderArray)
                    }
                }

                return firstOrderArray.concat(thirdOrderArray, secondOrderArray)

            } else if (checkFiles) {
                // Проверь не выполняются ли if по очереди 
                let relevantPosts = []
                for (let post of allPosts) {
                    let itHasFiles = await Bloodhound.doesItHaveFiles(post, searchQuery.files)
                    if (itHasFiles) relevantPosts.push(post)
                }
                return relevantPosts
            } else if (checkText) {
                let relevantPosts = []
                for (let post of allPosts) {
                    let itHasText = await Bloodhound.doesItHaveText(post, searchQuery.text)
                    if (itHasText) relevantPosts.push(post)
                }
                return relevantPosts
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Принимает объект поста и возвращает true, если в нем есть подходящий файл, если нет 
    static async doesItHaveFiles (post, files) {
        for (let checksFile of post.files) {
            let checksFileName = checksFile.fullname.split('.')[0] 
            let checksFileType = checksFile.fullname.split('.')[1]

            for (let searchFile of files) {
                // TODO: Присвоить fileType '.file' если он является пустой строкой
            }
        }
    }

    // Принимает объект поста и возвращает true, если в нем есть релевантный текст
    static async doesItHaveText (post, text) {

    }

    // isOP(массив модификаторов из searchQuery) => вернет true, если есть модификатор #OP, иначе false 
    static async isOP(modifiers) {
        for (let item of modifiers) {
            if (item === '#OP') return true
        }
        return false
    }

    // getData([Массив наименований (т.е. буков) досок], [результат isOP()]) => возвращает массив со всеми постами с перечисленных досок, если isOP() === true, то вернет только первые (заглавные) посты тредов 
    static async getData (boards = config.DEFAULT_BOARDS, isOP = false) {
        let data = []

        for (let board of boards) {
            let listOfBoardThreads = await API_2ch.getListOfBoardThreads(board)
            // console.log(listOfBoardThreads.threads)
            for (let thread of listOfBoardThreads.threads) {
                if (isOP) {
                    data.push(thread)
                } else {
                    // console.log(thread.num)
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