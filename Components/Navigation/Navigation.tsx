import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import Logo from './Logo/Logo'
import { StyledNavigation, StyledMenuContainer, StyledTabletMenu, StyledMobileOptions } from './styledNavigation'
import Hamburger from './Hamburger/Hamburger'
import Menu from './Menu/Menu'
import variants from './animationVariants'
import Favourites from './Favourites/Favourites'

const Navigation : React.FC = () => {

    const [launchMenu, setLaunchMenu] = useState<boolean>(false);

    return (
        <StyledNavigation>
            <Logo/>
            <StyledMobileOptions>
                <Favourites />
                <Hamburger launchMenu={launchMenu} setLaunchMenu={setLaunchMenu} />
            </StyledMobileOptions>
            <AnimatePresence>
                {launchMenu && (
                    <StyledMenuContainer id='menu' variants={variants} initial="hidden" animate="visible" exit="hidden">
                        <Menu />
                    </StyledMenuContainer>
                )}
            </AnimatePresence>
            <StyledTabletMenu>
                <Menu>
                    <Favourites />
                </Menu>
            </StyledTabletMenu>
        </StyledNavigation>
    )
}

export default Navigation