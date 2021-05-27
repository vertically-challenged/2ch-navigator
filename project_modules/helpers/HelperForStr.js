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

    // substringReplacement([Строка в которой необходимо произвести замену], [Какую подстроку необходимо заменить], [На что необходимо заменить]) => Новая строка с замененным фрагментом
    static substringReplacement (string, replaceableStr, replacementStr) {
        if (string.includes(replaceableStr)) {
            let newString = ''
            string.split(replaceableStr).forEach((item, index, arr) => {
                if (index != arr.length - 1) {
                    newString += item + replacementStr
                } else {
                    newString += item
                }
            })
            return newString
        } else {
            return string
        }
    }
}

module.exports = HelperForStr