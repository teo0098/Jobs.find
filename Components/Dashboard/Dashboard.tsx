import { Form } from "react-final-form"
import createDecorator from 'final-form-focus'

import useManageAccount from "../customHooks/useManageAccount"
import DashboardProps from "./dashboardProps"
import { StyledForm, StyledInputsContainer } from "../Signin/styledSignin"
import Name from "../Inputs/Name/Name"
import Surname from "../Inputs/Surname/Surname"
import Email from "../Inputs/Email/Email"
import { StyledCredentials } from "../Credentials/styledCredentials"
import { StyledButton } from "../SearchEngine/styledSearchEngine"
import Password from "../Inputs/Password/Password"
import RepeatPassword from "../Inputs/RepeatPassword/RepeatPassword"
import validateRepeatPassword from "../Signup/validateRepeatPassword"
import Loader from "../Loader/Loader"
import Modal from "../Modal/Modal"
import Info from "../Info/Info"
import InfoTypes from "../Info/InfoTypes"
import { StyledDiv } from "../Signup/styledSignup"
import Theme from "../../styles/theme"

const focusOnErrorDecorator = createDecorator()
const focusOnErrorDecorator2 = createDecorator()

const Dashboard : React.FC<DashboardProps> = ({ user }) => {

    const { handleEditPersonalData, handleEditPassword, state: { loading, error, errorMsg, success },
            edited, capitalizeText, deleteAccount } = useManageAccount()

    const renderStatus = (info : string | undefined) => {
        if (loading) return (
            <StyledDiv>
                <Loader light={true} />
            </StyledDiv>
        )
        else if (error) return (
            <Modal>
                <StyledDiv>
                    <Info state={InfoTypes.ERROR}>
                        {errorMsg}
                    </Info>
                </StyledDiv>
            </Modal>
        )
        else if (success && info) return (
            <Modal>
                <StyledDiv>
                    <Info state={InfoTypes.SUCCESS}>
                        {info}
                    </Info>
                </StyledDiv>
            </Modal>
        )
        return null
    }

    return (
        <StyledCredentials>
            <Form onSubmit={handleEditPersonalData} decorators={[focusOnErrorDecorator]}>
                {({ handleSubmit }) =>
                    <StyledForm onSubmit={handleSubmit}>
                        <StyledInputsContainer>
                            <Name defaultValue={capitalizeText(user?.name as string)} />
                            <Surname defaultValue={capitalizeText(user?.surname as string)} />
                            <Email defaultValue={user?.email} />
                        </StyledInputsContainer>
                        {edited === 0 ? renderStatus('Your data has been edited successfully') : null}
                        <StyledButton offsetTop="20px" width="100%" fontSize="16px" type="submit">Edit data</StyledButton>
                    </StyledForm>
                }
            </Form>
            <Form onSubmit={handleEditPassword} validate={validateRepeatPassword} decorators={[focusOnErrorDecorator2]}>
                {({ handleSubmit }) =>
                    <StyledForm marginTop='40px' onSubmit={handleSubmit}>
                        <StyledInputsContainer>
                            <Password />
                            <RepeatPassword />
                        </StyledInputsContainer>
                        {edited === 1 ? renderStatus('Your password has been edited successfully') : null}
                        <StyledButton offsetTop="20px" width="100%" fontSize="16px" type="submit">Edit password</StyledButton>
                    </StyledForm>
                }
            </Form>
            <StyledButton onClick={deleteAccount} color={Theme.colors.error} offsetTop="40px" width="100%" fontSize="16px">Delete account</StyledButton>
            {edited === 2 ? renderStatus(undefined) : null}
        </StyledCredentials>
    )
}

export default Dashboard