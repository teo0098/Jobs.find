import styled, { StyledComponent } from 'styled-components'

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
`