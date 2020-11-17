import Link from 'next/link'

import { StyledNav, StyledLink } from './styledMenu'
import MenuProps from './menuProps'

const Menu : React.FC<MenuProps> = ({ children, turnOfNav }) => (
    <StyledNav onClick={turnOfNav}>
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