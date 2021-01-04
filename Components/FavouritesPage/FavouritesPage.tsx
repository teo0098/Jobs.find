import Link from 'next/link'
import { useRouter } from 'next/router'

import FavouritesPageProps from './favouritesPageProps'
import { StyledDiv, StyledLink, StyledLinks, StyledData } from './styledFavouritesPage'

const FavouritesPage : React.FC<FavouritesPageProps> = ({ jobs, amount }) => {

    const { pathname } = useRouter()

    return (
        <StyledDiv>
            <StyledLinks>
                <Link href='/favourites/local' passHref>
                    <StyledLink active={pathname.includes('local') ? true : false}>Favourite jobs on this device</StyledLink>
                </Link>
                <Link href='/favourites/cloud' passHref>
                    <StyledLink active={pathname.includes('cloud') ? true : false}>Favourite jobs in a cloud</StyledLink>
                </Link>
            </StyledLinks>
            <StyledData>
                <p>Amount: {amount} </p>
                <p>{jobs.length}</p>
            </StyledData>
        </StyledDiv>
    )
} 

export default FavouritesPage