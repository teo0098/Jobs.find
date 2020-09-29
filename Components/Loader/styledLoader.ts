import styled, { StyledComponent } from 'styled-components'

export const StyledLoader : StyledComponent<"div", any> = styled.div`
    display: flex;
    justify-content: center;
    
    & * {
        color: ${({ theme }) => theme.colors.dark};
    }
`