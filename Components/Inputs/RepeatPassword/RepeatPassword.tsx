import TextField from '@material-ui/core/TextField'
import { Field } from 'react-final-form'

import InputsError from '../InputsError/InputsError'

const RepeatPassword : React.FC = () => (
    <Field name='rpassword' component='input'>
        {({ input, meta }) =>
            <div>
                <TextField type='password' style={{ width: '100%' }} {...input} label="Repeat password" variant="filled" />
                {meta.error && meta.touched && <InputsError> {meta.error} </InputsError>}
            </div>
        }
    </Field>
)

export default RepeatPassword