
const validator = {

}

validator.validatorStr = (str, length) => {
    if (str === '' || str.length > length) {
        return false
    } else {
        return true
    }
};

export default validator