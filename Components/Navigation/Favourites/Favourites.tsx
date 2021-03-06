import { memo } from 'react'
import Link from 'next/link'

import FavouriteIcon from '@material-ui/icons/FavoriteBorderOutlined'
import { StyledLink } from '../Menu/styledMenu'
import FavouitesProps from '../Menu/menuProps'

const Favourites : React.FC<FavouitesProps> = ({ turnOffNav }) => (
    <div onClick={turnOffNav}>
        <Link href='/favourites/local' passHref>
            <StyledLink noBorder>
                <FavouriteIcon style={{ marginTop: '4px' }} />
            </StyledLink>
        </Link>
    </div>
)

export default memo(Favourites)