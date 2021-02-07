import TextField from '@material-ui/core/TextField'
import { Field } from 'react-final-form'
import { memo } from 'react'

import Info from '../../Info/Info'
import InfoTypes from '../../Info/InfoTypes'
import InputProps from '../inputsProps'

const validateName = (name : string) => {
    if (!name) return 'Field is required';
    else if (!/^[A-Za-z\s]+$/.test(name)) return 'Only letters and optionally spaces'
    else if (name.trim().length === 0) return 'Only spaces? No no...'
    else if (name.trim().length > 20 || name.trim().length < 2) return 'From 2 up to 20 characters including spaces'
    return undefined
}

const Name : React.FC<InputProps> = ({ defaultValue }) => (
    <Field defaultValue={defaultValue} name='name' component='input' validate={validateName}>
        {({ input, meta }) =>
            <div>
                <TextField style={{ width: '100%' }} {...input} label="Name" variant="filled" />
                {meta.error && meta.touched && <Info state={InfoTypes.ERROR}> {meta.error} </Info>}
            </div>
        }
    </Field>
)

export default memo(Name)