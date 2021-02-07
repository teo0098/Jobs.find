import Link from 'next/link'

import { StyledNav, StyledLink } from './styledMenu'
import MenuProps from './menuProps'
import Profile from './Profile/Profile'

const Menu : React.FC<MenuProps> = ({ children, turnOffNav }) => (
    <StyledNav onClick={turnOffNav}>
        <Link href='/' passHref>
            <StyledLink isFirst>Jobs offers</StyledLink>
        </Link>
        {children ? children : null}
        <Profile />
    </StyledNav>
)

export default Menu