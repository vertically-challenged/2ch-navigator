class HelperForArr {
    // Удаляет пустые строки из массива строк, возвращает новый массив без пустых строк
    static deleteEmptyStringsFromArray (arr) {
        let newArr = []
        arr.forEach((item) => {
            item == '' || newArr.push(item)
        })
        return newArr
    }
}

module.exports = HelperForArr