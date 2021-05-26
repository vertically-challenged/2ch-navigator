class HelperForStr {

    // eraseFromString([Строка], [символ, которые необходимо из нее удалить]) => Новая строка без ненужного символа 
    static eraseCharFromString (str, char) {
        let newStr = ''
        str
            .split('')
            .forEach((item) => {
                newStr += (item != char) ? item : '' 
            })

        return newStr
    }
}

module.exports = HelperForStr