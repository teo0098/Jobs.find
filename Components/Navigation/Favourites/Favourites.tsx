import Link from 'next/link'

import FavouriteIcon from '@material-ui/icons/FavoriteBorderOutlined'
import { StyledLink } from '../Menu/styledMenu'

const Favourites : React.FC = () => (
    <Link href='/favourites' passHref>
        <StyledLink noBorder>
            <FavouriteIcon style={{ marginTop: '5px' }} />
        </StyledLink>
    </Link>
)

export default Favourites