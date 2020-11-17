import styled, { StyledComponent } from 'styled-components'

export const StyledCredentials : StyledComponent<'div', any> = styled.div`
    margin: 10px;
    background-color: ${({ theme }) => theme.colors.dark};
    padding: 20px;
    border-radius: 3px;

    ${({ theme }) => theme.media.tablet} {
        width: 350px;
        margin: 30px auto;
    }
`

export const StyledLinks : StyledComponent<'div', any> = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`

interface StyledLinkProps {
    active : boolean;
}

export const StyledLink : StyledComponent<'a', any, StyledLinkProps> = styled.a<StyledLinkProps>`
    margin-left: 10px;
    margin-right: 10px;
    letter-spacing: 1px;
    padding: 2px;
    color: ${({ theme }) => theme.colors.light};
    border-bottom: ${({ active, theme }) => active ? `0.5px solid ${theme.colors.light}` : 'none'};
`