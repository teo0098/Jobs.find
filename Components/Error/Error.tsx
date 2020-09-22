import WarningIcon from '@material-ui/icons/Warning';

import { StyledError, StyledErrorMsg } from './styledError'

const Error : React.FC = ({ children }) => (
    <StyledError>
        <WarningIcon style={{ fontSize: '40px' }} />
        <StyledErrorMsg> {children} </StyledErrorMsg>
    </StyledError>
)

export default Error