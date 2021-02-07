const validatePassword = (password : string, rpassword : string) => {
    if (!/^[A-Za-z0-9!@#$_-]{8,30}$/.test(password)) return false
    if (rpassword !== password) return false
    return true
}

export default validatePassword