import { StyledDiv, StyledP } from './styledInfo'
import InfoProps from './infoProps'

const Info : React.FC<InfoProps> = ({ children, state }) => (
    <StyledDiv state={state}>
        <StyledP state={state}> {children} </StyledP>
    </StyledDiv>
)

export default Info