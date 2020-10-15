import styled, { StyledComponent } from 'styled-components'

import { StyledButton } from '../SearchEngine/styledSearchEngine'

export const StyledJobs : StyledComponent<"div", any> = styled.div`
    ${({ theme }) => theme.media.desktop} {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 50px;
    }
`

export const StyledError : StyledComponent<"div", any> = styled.div`
    padding: 20px;

    ${({ theme }) => theme.media.desktop} {
        padding: 0 20px;
    }
`

export const StyledMoreButton = styled(StyledButton)`
    margin: 20px auto;
    display: block;
`

export const StyledLoader : StyledComponent<"div", any> = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`

export const StyledMoreError : StyledComponent<"div", any> = styled.div`
    width: 90%;
    margin: 20px auto 0 auto;

    ${({ theme }) => theme.media.tablet} {
        width: auto;
        display: flex;
        justify-content: center;
        padding: 0 20px;
    }
`

export const StyledNoResults : StyledComponent<"section", any> = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 5px;
`

export const StyledP : StyledComponent<"p", any> = styled.p`
    color: ${({ theme }) => theme.colors.dark};
`