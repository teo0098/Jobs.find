import { memo } from 'react'

import { StyledFooter } from './styledFooter'

const Footer : React.FC = () => (
    <StyledFooter>
        All rights reserved &copy;
    </StyledFooter>
)

export default memo(Footer)