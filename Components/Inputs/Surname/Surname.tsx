import TextField from '@material-ui/core/TextField'
import { Field } from 'react-final-form'

import InputsError from '../InputsError/InputsError'

const validateSurname = (surname : string) => {
    if (!surname) return 'Field is required'
    else if (!/^[A-Za-z\s]+$/.test(surname)) return 'Only letters and optionally spaces'
    else if (surname.trim().length === 0) return 'Only spaces? No no...'
    else if (surname.trim().length > 30 || surname.trim().length < 2) return 'From 2 up to 30 characters including spaces'
    return undefined
}

const Surname : React.FC = () => (
    <Field name='surname' component='input' validate={validateSurname}>
        {({ input, meta }) =>
            <div>
                <TextField style={{ width: '100%' }} {...input} label='Surname' variant='filled' />
                {meta.error && meta.touched && <InputsError> {meta.error} </InputsError>}
            </div>
        }
    </Field>
)

export default Surname