import { memo } from 'react'
import Link from 'next/link'

import StyledLogo from './styledLogo'
import LogoProps from '../Menu/menuProps'

const Logo : React.FC<LogoProps> = ({ turnOfNav }) => (
    <div onClick={turnOfNav}>
        <Link href='/'>
            <a>
                <StyledLogo src="/Logo.png" alt="Logo" />
            </a>
        </Link>
    </div>
)

export default memo(Logo)