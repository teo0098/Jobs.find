import styled, { StyledComponent } from 'styled-components'

export const StyledDiv : StyledComponent<"div", any> = styled.div`
    background-color: ${({ theme }) => theme.colors.lightError};
    padding: 10px;
`

export const StyledP : StyledComponent<"p", any> = styled.p`
    color: ${({ theme }) => theme.colors.error};
`