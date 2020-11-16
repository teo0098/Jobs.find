import TextField from '@material-ui/core/TextField'
import { Field } from 'react-final-form'
import validator from 'validator'

import InputsError from '../InputsError/InputsError'

export const validateEmail = (email : string) => {
    if (!email) return 'Field is required'
    else if (!validator.isEmail(email)) return 'Invalid email'
    return undefined
}

const Email : React.FC = () => (
    <Field name='email' component='input' validate={validateEmail}>
        {({ input, meta }) =>
            <div>
                <TextField style={{ width: '100%' }} {...input} label="Email" variant="filled" />
                {meta.error && meta.touched && <InputsError> {meta.error} </InputsError>}
            </div>
        }
    </Field>
)

export default Email