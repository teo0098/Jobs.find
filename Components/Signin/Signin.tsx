import { Form } from 'react-final-form'
import createDecorator from 'final-form-focus'

import useSignin from '../customHooks/useSignin'
import { StyledButton } from '../SearchEngine/styledSearchEngine'
import EmailInput from '../Inputs/Email/Email'
import PasswordInput from '../Inputs/Password/Password'
import { StyledInputsContainer, StyledForm } from './styledSignin'

const focusOnErrorDecorator = createDecorator()

const Signin : React.FC = () => {

    const { handleOnSubmit } = useSignin()

    return (
        <Form onSubmit={handleOnSubmit} decorators={[focusOnErrorDecorator]}>
            {({ handleSubmit }) => 
                <StyledForm onSubmit={handleSubmit}>
                    <StyledInputsContainer>
                        <EmailInput />
                        <PasswordInput />
                    </StyledInputsContainer>
                    <StyledButton offsetTop="20px" width="100%" fontSize="16px" type="submit">Sign in</StyledButton>
                </StyledForm>
            }
        </Form>
    )
}

export default Signin