import Link from 'next/link'

import { StyledNav, StyledLink } from './styledMenu'

const Menu : React.FC = () => (
    <StyledNav>
        <Link href='/' passHref>
            <StyledLink isFirst>Jobs offers</StyledLink>
        </Link>
        <Link href='/employer' passHref>
            <StyledLink>Employer's section</StyledLink>
        </Link>
        <Link href='/signin' passHref>
            <StyledLink>Log in</StyledLink>
        </Link>
    </StyledNav>
)

export default Menu