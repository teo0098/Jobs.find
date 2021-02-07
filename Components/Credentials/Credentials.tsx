import Link from 'next/link'
import { useRouter } from 'next/router'

import { StyledCredentials, StyledLinks, StyledLink } from './styledCredentials'

const Credentials : React.FC = ({ children }) => {

    const { pathname } = useRouter()

    return (
        <StyledCredentials>
            <StyledLinks>
                <Link href='/signin' passHref>
                    <StyledLink active={pathname === '/signin' ? true : false}>Sign in</StyledLink>           
                </Link>
                <Link href='/signup' passHref>
                    <StyledLink active={pathname === '/signup' ? true : false}>Sign up</StyledLink>
                </Link>
            </StyledLinks>
            {children}
        </StyledCredentials>
    )
} 

export default Credentials