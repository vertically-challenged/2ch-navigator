const config = require('./Bloodhound_config')
const API_2ch = require('../API_2ch/API_2ch')
const ALL_TYPE_TAGS = config.fileTypeClasses.ALL_FILES.classNames
const VIDEO_TYPE_TAGS = config.fileTypeClasses.VIDEO_FILES.classNames
const VIDEO_FORMATS = config.fileTypeClasses.VIDEO_FILES.listOfFormats
const IMG_TYPE_TAGS = config.fileTypeClasses.IMAGE_FILES.classNames
const IMG_FORMATS = config.fileTypeClasses.IMAGE_FILES.listOfFormats

class Bloodhound {
    constructor () {
        
    }
// Способы поиска описываются как методы будущего объекта

    async defaultSearch (searchQuery) {

        try {
            if (searchQuery.files.length == 0 && searchQuery.text == '') return []
            let allPosts = await Bloodhound.getData(searchQuery.boards, await Bloodhound.isOP(searchQuery.modifiers))
            console.log('allPosts: ', allPosts.length)

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
        let nameCoincided = false 

        if (post.files.length != 0) {
            for (let checksFile of post.files) {
                if (checksFile.fullname != undefined) {                   
                    let lowercaseFullname = checksFile.fullname.toLowerCase()
                    let checksFileName = lowercaseFullname.split('.')[0]
                    let checksFileType = lowercaseFullname.split('.')[1]
                    for (let wantedFile of files) {
                        if (wantedFile.fileName.length == 0) {
                            nameCoincided = true
                        } else {
                            nameCoincided = (checksFileName == wantedFile.fileName)
                        }

                        if (nameCoincided) {
                            if (checksFileType == wantedFile.fileType) return true
                            for (let tags of ALL_TYPE_TAGS) {
                                if (wantedFile.fileType == tags) return true
                            }
                            for (let tags of VIDEO_TYPE_TAGS) {
                                if (wantedFile.fileType == tags) {
                                    for (let format of VIDEO_FORMATS) {
                                        if (checksFileType == format) return true
                                    }                                    
                                }
                            }
                            for (let tags of IMG_TYPE_TAGS) {
                                if (wantedFile.fileType == tags) {
                                    for (let format of IMG_FORMATS) {
                                        if (checksFileType == format) return true
                                    }                                    
                                }
                            }
                        }
                    }
                }
            }
        }
        return false
    }

    // Принимает объект поста и возвращает true, если в нем есть релевантный текст
    static async doesItHaveText (post, text) {
        return post.comment.toLowerCase().includes(text)
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
            for (let thread of listOfBoardThreads.threads) {
                if (isOP) {
                    //FIXME: Пока пропишу добавление ссылки на пост прямо здесь, но если это будет слишком медленно работать, то это стоит исправить 
                    thread.link = `https://2ch.hk/${board}/res/${thread.num}.html`
                    if (board == 'b') delete thread.subject
                    data.push(thread)
                } else {
                    let arrayOfPostsFromThisThread = await API_2ch.getPostsFromThisThread(board, thread.num)
                        for (let post of arrayOfPostsFromThisThread) {
                            post.link = `https://2ch.hk/${board}/res/${thread.num}.html#${post.num}`
                            data.push(post)
                        }
                }
            }
        }

        return data
    }


}

module.exports = Bloodhound;