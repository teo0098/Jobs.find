import TextField from '@material-ui/core/TextField'
import { Field } from 'react-final-form'
import { memo } from 'react'

import Info from '../../Info/Info'
import InfoTypes from '../../Info/InfoTypes'

const RepeatPassword : React.FC = () => (
    <Field name='rpassword' component='input'>
        {({ input, meta }) =>
            <div>
                <TextField type='password' style={{ width: '100%' }} {...input} label="Repeat password" variant="filled" />
                {meta.error && meta.touched && <Info state={InfoTypes.ERROR}> {meta.error} </Info>}
            </div>
        }
    </Field>
)

export default memo(RepeatPassword)