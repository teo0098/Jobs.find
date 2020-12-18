import styled, { StyledComponent } from 'styled-components'

export const StyledFooter : StyledComponent<"footer", any> = styled.footer`
    background-color: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.light};
    padding: 10px;
    height: 50px;
    text-align: center;
`