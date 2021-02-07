import validator from "validator"

const validateData = (name : string, surname : string, email : string) => {
    if (!/^[A-Za-z\s]{2,20}$/.test(name) || name.trim().length === 0) return false
    if (!/^[A-Za-z\s]{2,30}$/.test(surname) || surname.trim().length === 0) return false
    if (!email || !validator.isEmail(email)) return false
    return true
}

export default validateData