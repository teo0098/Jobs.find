import styled, { StyledComponent } from 'styled-components'

export const StyledLoader : StyledComponent<"div", any> = styled.div`
    & * {
        color: ${({ theme }) => theme.colors.dark};
    }
`