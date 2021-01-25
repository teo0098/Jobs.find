import Link from 'next/link'
import cookies from 'js-cookie'

import { StyledNav, StyledLink } from './styledMenu'
import MenuProps from './menuProps'
import Profile from './Profile/Profile'

const Menu : React.FC<MenuProps> = ({ children, turnOffNav }) => (
    <StyledNav onClick={turnOffNav}>
        <Link href='/' passHref>
            <StyledLink isFirst>Jobs offers</StyledLink>
        </Link>
        {children ? children : null}
        {!cookies.get('name') && !cookies.get('refreshToken') ?
            <Link href='/signin' passHref>
                <StyledLink>Log in</StyledLink>
            </Link>
            :
            <Profile />
        }
    </StyledNav>
)

export default Menu