import { Field } from 'react-final-form'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import Info from '../../Info/Info'
import InfoTypes from '../../Info/InfoTypes'

const validateAdulthood = (checked : boolean) => {
    if (!checked) return 'Field is required'
    return undefined
}

const Adult : React.FC = () => (
    <Field name='adult' component='input' type='checkbox' validate={validateAdulthood}>
        {({ input, meta }) =>
            <div>
                <FormControlLabel 
                control={<Checkbox {...input} color='primary' />}
                label="I am in the age of 18"/>
                {meta.error && meta.touched && <Info state={InfoTypes.ERROR}> {meta.error} </Info>}
            </div>
        }
    </Field>
)

export default Adult