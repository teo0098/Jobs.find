const validateRepeatPassword = (values : any) => {
    const errors : { rpassword ?: string } = {}
    if (!values.rpassword) errors.rpassword = 'Field is required'
    if (values.password !== values.rpassword) errors.rpassword = 'Passwords must match'
    return errors;
}

export default validateRepeatPassword