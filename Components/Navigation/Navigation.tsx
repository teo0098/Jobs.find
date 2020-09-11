import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import Logo from './Logo/Logo'
import { StyledNavigation, StyledMenuContainer, StyledTabletMenu } from './styledNavigation'
import Hamburger from './Hamburger/Hamburger'
import Menu from './Menu/Menu'
import variants from './animationVariants'

const Navigation : React.FC = () => {

    const [launchMenu, setLaunchMenu] = useState<boolean>(false);

    return (
        <StyledNavigation>
            <Logo/>
            <Hamburger launchMenu={launchMenu} setLaunchMenu={setLaunchMenu} />
            <AnimatePresence>
                {launchMenu && (
                    <StyledMenuContainer variants={variants} initial="hidden" animate="visible" exit="hidden">
                        <Menu />
                    </StyledMenuContainer>
                )}
            </AnimatePresence>
            <StyledTabletMenu>
                <Menu />
            </StyledTabletMenu>
        </StyledNavigation>
    )
}

export default Navigation