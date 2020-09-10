import { useState } from 'react'

import { StyledHamburgerWrapper, StyledHamburgerDashes } from './styledHamburger'

const Hamburger : React.FC = () => {

    const [launchHamburger, setLaunchHamburger] = useState<boolean>(false);

    return (
        <StyledHamburgerWrapper onClick={() => setLaunchHamburger(prevState => !prevState)}>
            <StyledHamburgerDashes isHamburgerLaunched={launchHamburger} />
        </StyledHamburgerWrapper>
    )
}

export default Hamburger