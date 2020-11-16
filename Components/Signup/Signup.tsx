import { Form } from 'react-final-form'
import createDecorator from 'final-form-focus'

import useSignup from '../customHooks/useSignup'
import { StyledButton } from '../SearchEngine/styledSearchEngine'
import Name from '../Inputs/Name/Name'
import Surname from '../Inputs/Surname/Surname'
import EmailInput from '../Inputs/Email/Email'
import PasswordInput from '../Inputs/Password/Password'
import RepeatPasswordInput from '../Inputs/RepeatPassword/RepeatPassword'
import AdultCheckbox from '../Inputs/Adult/Adult';
import { StyledInputsContainer, StyledForm } from '../Signin/styledSignin'
import validateRepeatPassword from './validateRepeatPassword'

const focusOnErrorDecorator = createDecorator()

const Signup : React.FC = () => {

    const { handleOnSubmit } = useSignup()

    return (
        <Form onSubmit={handleOnSubmit} validate={validateRepeatPassword} decorators={[focusOnErrorDecorator]}>
            {({ handleSubmit }) =>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledInputsContainer>
                        <Name />
                        <Surname />
                        <EmailInput />
                        <PasswordInput />
                        <RepeatPasswordInput />
                        <AdultCheckbox />
                    </StyledInputsContainer>
                    <StyledButton offsetTop="20px" width="100%" fontSize="16px" type="submit">Sign up</StyledButton>
                </StyledForm>
            }
        </Form>
    )
}

export default Signup