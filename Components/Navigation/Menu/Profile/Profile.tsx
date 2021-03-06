import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Link from 'next/link'
import cookies from 'js-cookie'
import { AnimatePresence } from 'framer-motion'
import { connect } from 'react-redux'

import Theme from '../../../../styles/theme';
import { StyledProfile, StyledSubmenu, StyledUserMenu } from './styledProfile'
import { StyledLink } from '../styledMenu'
import variants from './animationVariants'
import useLogout from '../../../customHooks/useLogout';
import Loader from '../../../Loader/Loader';
import { StyledDiv } from '../../../Signup/styledSignup';

const Profile : React.FC<{name : string}> = ({ name }) => {
    
    const { logout, state: { loading }, submenu, setSubmenu } = useLogout()

    return (
        !cookies.get('_id') ?
            <Link href='/signin' passHref>
                <StyledLink>Log in</StyledLink>
            </Link>
            :
            <>
                <StyledProfile onClick={e => {
                    e.stopPropagation()
                    setSubmenu(prevState => !prevState)
                }}>
                    {name}
                    <ArrowDropDownIcon style={{ marginTop: '4px' }} />
                </StyledProfile>
                <>
                    <AnimatePresence>
                        {submenu && (
                            <StyledUserMenu>
                                <StyledSubmenu onClick={() => setSubmenu(false)} 
                                key='submenu' variants={variants} initial='hidden' animate='visible' exit='hidden'>
                                    <Link href='/dashboard' passHref>
                                        <StyledLink paddingLeft='40px' backgroundColor={Theme.colors.light} textColor={Theme.colors.dark}>My profile</StyledLink>
                                    </Link>
                                    <Link href='#' passHref>
                                        <StyledLink onClick={e => {
                                            e.stopPropagation()
                                            logout()
                                        }} paddingLeft='40px' backgroundColor={Theme.colors.light} textColor={Theme.colors.dark}>Log out</StyledLink>
                                    </Link>
                                    {loading ? <StyledDiv> <Loader light /> </StyledDiv> : null}
                                </StyledSubmenu>
                            </StyledUserMenu>
                        )}
                    </AnimatePresence>
                </>
            </>
    )
}

const mapUserStateToProps = (state : any) => ({
    name: state.user.name,
})

export default connect(mapUserStateToProps)(Profile)