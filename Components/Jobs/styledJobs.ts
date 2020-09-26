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

    & * {
        color: ${({ theme }) => theme.colors.dark};
    }
`