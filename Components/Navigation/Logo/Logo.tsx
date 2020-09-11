import Link from 'next/link'

import StyledLogo from './styledLogo'

const Logo : React.FC = () => (
    <Link href='/'>
        <a>
            <StyledLogo src="/Logo.png" alt="Logo" />
        </a>
    </Link>
)

export default Logo;