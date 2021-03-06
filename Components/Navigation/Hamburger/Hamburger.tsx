import { StyledHamburgerWrapper, StyledHamburgerDashes } from './styledHamburger'
import HamburgerProps from './hamburgerProps'

const Hamburger : React.FC<HamburgerProps> = ({ launchMenu, setLaunchMenu }) => (
    <StyledHamburgerWrapper id='hamburger' onClick={e => {
        e.stopPropagation()
        setLaunchMenu(prevState => !prevState)
    }}>
        <StyledHamburgerDashes isHamburgerLaunched={launchMenu} />
    </StyledHamburgerWrapper>
)

export default Hamburger