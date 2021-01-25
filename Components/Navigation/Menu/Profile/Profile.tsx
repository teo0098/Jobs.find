import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Link from 'next/link'
import cookies from 'js-cookie'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import Theme from '../../../../styles/theme';
import { StyledProfile, StyledSubmenu, StyledUserMenu } from './styledProfile'
import { StyledLink } from '../styledMenu'
import variants from './animationVariants'

const Profile = () => {

    const [submenu, setSubmenu] = useState<boolean>(false)

    return (
        <>
            <StyledProfile onClick={e => {
                e.stopPropagation()
                setSubmenu(prevState => !prevState)
            }}>
                {cookies.get('name')}
                <ArrowDropDownIcon style={{ marginTop: '4px' }} />
            </StyledProfile>
            <AnimatePresence>
                {submenu && (
                    <StyledUserMenu>
                        <StyledSubmenu key='submenu' variants={variants} initial='hidden' animate='visible' exit='hidden'>
                            <Link href='/signin' passHref>
                                <StyledLink paddingLeft='40px' backgroundColor={Theme.colors.light} textColor={Theme.colors.dark}>My profile</StyledLink>
                            </Link>
                            <Link href='/signin' passHref>
                                <StyledLink paddingLeft='40px' backgroundColor={Theme.colors.light} textColor={Theme.colors.dark}>Log out</StyledLink>
                            </Link>
                        </StyledSubmenu>
                    </StyledUserMenu>
                )}
            </AnimatePresence>
        </>
    )
}

export default Profile