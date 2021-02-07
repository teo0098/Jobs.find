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
import { StyledDiv } from './styledSignup'
import validateRepeatPassword from './validateRepeatPassword'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'
import Info from '../Info/Info'
import InfoTypes from '../Info/InfoTypes'

const focusOnErrorDecorator = createDecorator()

const Signup : React.FC = () => {

    const { handleOnSubmit, state: { loading, success, error, errorMsg } } = useSignup()

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
                    {loading ? <StyledDiv> <Loader light /> </StyledDiv> : null}
                    {success ? <Modal>
                        <StyledDiv>
                            <Info state={InfoTypes.SUCCESS}>Your account has been created successfully</Info>
                        </StyledDiv>
                    </Modal> : null }
                    {error ? <Modal>
                        <StyledDiv>
                            <Info state={InfoTypes.ERROR}> {errorMsg} </Info>
                        </StyledDiv>
                    </Modal> : null}
                    <StyledButton offsetTop="20px" width="100%" fontSize="16px" type="submit">Sign up</StyledButton>
                </StyledForm>
            }
        </Form>
    )
}

export default Signup