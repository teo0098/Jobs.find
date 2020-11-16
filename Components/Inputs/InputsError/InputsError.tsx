import { StyledDiv, StyledP } from './styledInputsError'

const InputsError : React.FC = ({ children }) => (
    <StyledDiv>
        <StyledP> {children} </StyledP>
    </StyledDiv>
)

export default InputsError