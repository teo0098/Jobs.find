import Link from 'next/link'
import { useRouter } from 'next/router'

import FavouritesPageProps from './favouritesPageProps'
import * as SC from './styledFavouritesPage'

const FavouritesPage : React.FC<FavouritesPageProps> = ({ amount, children }) => {

    const { pathname } = useRouter()

    return (
        <SC.StyledDiv>
            <SC.StyledLinks>
                <Link href='/favourites/local' passHref>
                    <SC.StyledLink active={pathname.includes('local') ? true : false}>Favourite jobs on this device</SC.StyledLink>
                </Link>
                <Link href='/favourites/cloud' passHref>
                    <SC.StyledLink active={pathname.includes('cloud') ? true : false}>Favourite jobs in a cloud</SC.StyledLink>
                </Link>
            </SC.StyledLinks>
            <SC.StyledData>
                <p>Amount: {amount} </p>
                {children}
            </SC.StyledData>
        </SC.StyledDiv>
    )
} 

export default FavouritesPage