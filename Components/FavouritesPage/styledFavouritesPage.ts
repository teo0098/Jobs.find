import styled, { StyledComponent } from 'styled-components'

export const StyledDiv : StyledComponent<"div", any> = styled.div`
    padding: 5px;

    ${({ theme }) => theme.media.desktop} {
        padding: 20px;
    }
`

interface StyledLinkProps {
    active : boolean;
}

export const StyledLink : StyledComponent<"a", any, StyledLinkProps> = styled.a<StyledLinkProps>`
    color: ${({ theme }) => theme.colors.lightGray};
    background-color: ${({ theme }) => theme.colors.dark};
    padding: 10px;
    display: block;
    text-align: center;
    border: ${({ active, theme }) => active ? `3px solid ${theme.colors.lightBlue}` : 'none'};
    border-bottom: ${({ active, theme }) => active ? `unset` : `3px solid ${theme.colors.lightBlue}`};
    width: 100%;
`

export const StyledLinks : StyledComponent<"div", any> = styled.div`
    display: flex;
`

export const StyledData : StyledComponent<"div", any> = styled.div`
    border: ${({ theme }) => `3px solid ${theme.colors.lightBlue}`};
    border-top: unset;
`

export const StyledJob : StyledComponent<"div", any> = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin-bottom: 20px;
`