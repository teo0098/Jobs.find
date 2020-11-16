import TextField from '@material-ui/core/TextField'
import { Field } from 'react-final-form'

import InputsError from '../InputsError/InputsError'

const validatePassword = (password : string) => {
    if (!password) return 'Field is required'
    else if (!/^[A-Za-z0-9!@#$_-]+$/.test(password)) return 'Only letters, digits and ! @ # $ _ -'
    else if (password.trim().length > 30 || password.trim().length < 8) return 'From 8 up to 30 characters'
    return undefined
}

const Password : React.FC = () => (
    <Field name='password' component='input' validate={validatePassword}>
        {({ input, meta }) =>
            <div>
                <TextField color='primary' type='password' style={{ width: '100%' }} {...input} label="Password" variant="filled" />
                {meta.error && meta.touched && <InputsError> {meta.error} </InputsError>}
            </div>
        }
    </Field>
)

export default Password