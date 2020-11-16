import Link from 'next/link'

import { StyledCredentials, StyledLinks, StyledLink } from './styledCredentials'

const Credentials : React.FC = ({ children }) => (
    <StyledCredentials>
        <StyledLinks>
            <Link href='/signin' passHref>
                <StyledLink>Sign in</StyledLink>           
            </Link>
            <Link href='/signup' passHref>
                <StyledLink>Sign up</StyledLink>
            </Link>
        </StyledLinks>
        {children}
    </StyledCredentials>
)

export default Credentials