import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import Logo from './Logo/Logo'
import { StyledNavigation, StyledMenuContainer, StyledTabletMenu, StyledMobileOptions } from './styledNavigation'
import Hamburger from './Hamburger/Hamburger'
import Menu from './Menu/Menu'
import variants from './animationVariants'
import Favourites from './Favourites/Favourites'

const Navigation : React.FC = () => {

    const [launchMenu, setLaunchMenu] = useState<boolean>(false)

    const handleOnClick = () => launchMenu && setLaunchMenu ? setLaunchMenu(false) : null

    return (
        <StyledNavigation onClick={() => setLaunchMenu(false)}>
            <Logo turnOffNav={handleOnClick} />
            <StyledMobileOptions>
                <Favourites turnOffNav={handleOnClick} />
                <Hamburger launchMenu={launchMenu} setLaunchMenu={setLaunchMenu} />
            </StyledMobileOptions>
            <AnimatePresence>
                {launchMenu && (
                    <StyledMenuContainer id='menu' variants={variants} initial="hidden" animate="visible" exit="hidden">
                        <Menu turnOffNav={handleOnClick} />
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