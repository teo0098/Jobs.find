import { Form } from 'react-final-form'
import createDecorator from 'final-form-focus'
import cookies from 'js-cookie'

import useSignin from '../customHooks/useSignin'
import { StyledButton } from '../SearchEngine/styledSearchEngine'
import EmailInput from '../Inputs/Email/Email'
import PasswordInput from '../Inputs/Password/Password'
import { StyledInputsContainer, StyledForm } from './styledSignin'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'
import Info from '../Info/Info'
import InfoTypes from '../Info/InfoTypes'
import { StyledDiv } from '../Signup/styledSignup'

const focusOnErrorDecorator = createDecorator()

const Signin : React.FC = () => {

    const { handleOnSubmit, state: { error, errorMsg, loading } } = useSignin()

    return (
        <>
            {!cookies.get('accountDeleted') ? null :
                <Modal>
                    <StyledDiv marginBottom='20px'>
                        <Info state={InfoTypes.SUCCESS}> Account has been deleted successfully </Info>
                    </StyledDiv>
                </Modal>
            }
            <Form onSubmit={handleOnSubmit} decorators={[focusOnErrorDecorator]}>
                {({ handleSubmit }) => 
                    <StyledForm onSubmit={handleSubmit}>
                        <StyledInputsContainer>
                            <EmailInput />
                            <PasswordInput />
                        </StyledInputsContainer>
                        {loading ? <StyledDiv> <Loader light /> </StyledDiv> : null}
                        {error ? <Modal>
                            <StyledDiv>
                                <Info state={InfoTypes.ERROR}> {errorMsg} </Info>
                            </StyledDiv>
                        </Modal> : null}
                        <StyledButton offsetTop="20px" width="100%" fontSize="16px" type="submit">Sign in</StyledButton>
                    </StyledForm>
                }
            </Form>
        </>
    )
}

export default Signin