import Link from 'next/link'

import { StyledNav, StyledLink } from './styledMenu'

const Menu : React.FC = ({ children }) => (
    <StyledNav>
        <Link href='/' passHref>
            <StyledLink isFirst>Jobs offers</StyledLink>
        </Link>
        {children ? children : null}
        <Link href='/signin' passHref>
            <StyledLink>Log in</StyledLink>
        </Link>
    </StyledNav>
)

export default Menu