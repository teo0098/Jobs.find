import Logo from './Logo/Logo'
import StyledNavigation from './styledNavigation'
import Hamburger from './Hamburger/Hamburger'

const Navigation : React.FC = () => {
    return (
        <StyledNavigation>
            <Logo/>
            <Hamburger />
        </StyledNavigation>
    )
}

export default Navigation