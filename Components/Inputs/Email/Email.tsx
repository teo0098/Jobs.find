import TextField from '@material-ui/core/TextField'
import { Field } from 'react-final-form'
import validator from 'validator'

import Info from '../../Info/Info'
import InfoTypes from '../../Info/InfoTypes'
import InputProps from '../inputsProps'

export const validateEmail = (email : string) => {
    if (!email) return 'Field is required'
    else if (!validator.isEmail(email)) return 'Invalid email'
    return undefined
}

const Email : React.FC<InputProps> = ({ defaultValue }) => (
    <Field defaultValue={defaultValue} name='email' component='input' validate={validateEmail}>
        {({ input, meta }) =>
            <div id='emailField'>
                <TextField style={{ width: '100%' }} {...input} label="Email" variant="filled" />
                {meta.error && meta.touched && <Info state={InfoTypes.ERROR}> {meta.error} </Info>}
            </div>
        }
    </Field>
)

export default Email